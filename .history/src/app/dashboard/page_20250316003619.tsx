'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '../../components/Navigation';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../lib/api';

interface IpfsContent {
  id: number;
  user_id: number;
  cid: string;
  content_type?: string;
  filename?: string;
  size?: number;
  pinned: boolean;
  created_at: string;
}

interface ContentStats {
  total: number;
  pinned: number;
  totalSize: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const { isLoading: authLoading, isAuthenticated } = useAuth();
  
  const [content, setContent] = useState<IpfsContent[]>([]);
  const [stats, setStats] = useState<ContentStats>({ total: 0, pinned: 0, totalSize: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newCid, setNewCid] = useState('');
  const [newFilename, setNewFilename] = useState('');
  const [newContentType, setNewContentType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch IPFS content
  useEffect(() => {
    if (isAuthenticated) {
      fetchContent();
    }
  }, [isAuthenticated]);

  const fetchContent = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.ipfs.getContent();
      if (response.error) {
        throw new Error(response.error);
      }
      
      setContent(response.data?.content || []);
      setStats(response.data?.stats || { total: 0, pinned: 0, totalSize: 0 });
    } catch (err) {
      console.error('Error fetching IPFS content:', err);
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCid) {
      setError('CID is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await api.ipfs.createContent({
        cid: newCid,
        filename: newFilename || undefined,
        contentType: newContentType || undefined,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      // Reset form
      setNewCid('');
      setNewFilename('');
      setNewContentType('');
      
      // Refresh content list
      fetchContent();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePin = async (cid: string, currentPinned: boolean) => {
    try {
      const response = await api.ipfs.updatePinStatus(cid, !currentPinned);
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Update local state
      setContent(prevContent => 
        prevContent.map(item => 
          item.cid === cid ? { ...item, pinned: !currentPinned } : item
        )
      );
      
      // Update stats
      setStats(prevStats => ({
        ...prevStats,
        pinned: currentPinned 
          ? Math.max(0, prevStats.pinned - 1) 
          : prevStats.pinned + 1
      }));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDelete = async (cid: string) => {
    if (!confirm('Are you sure you want to delete this content?')) {
      return;
    }

    try {
      const response = await api.ipfs.deleteContent(cid);
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Refresh content list
      fetchContent();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (bytes === undefined) return 'Unknown';
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (authLoading) {
    return (
      <div className="win98-desktop">
        <Navigation />
        <div className="window" style={{ maxWidth: '600px', margin: '20px auto' }}>
          <div className="window-title">
            <span>Loading...</span>
          </div>
          <div className="window-content" style={{ textAlign: 'center', padding: '20px' }}>
            <div className="loading-98"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="win98-desktop">
      <Navigation />
      
      <div className="window" style={{ maxWidth: '900px', margin: '20px auto' }}>
        <div className="window-title">
          <span>IPFS Content Dashboard</span>
          <span>×</span>
        </div>
        <div className="window-content">
          {error && (
            <div style={{ 
              backgroundColor: '#ffdddd', 
              border: '1px solid #ff0000', 
              padding: '10px', 
              marginBottom: '15px' 
            }}>
              Error: {error}
            </div>
          )}

          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <div style={{ flex: 1, padding: '10px', border: '1px solid #c0c0c0' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>Content Stats</h3>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>Total Files:</td>
                    <td>{stats.total}</td>
                  </tr>
                  <tr>
                    <td>Pinned Files:</td>
                    <td>{stats.pinned}</td>
                  </tr>
                  <tr>
                    <td>Total Size:</td>
                    <td>{formatFileSize(stats.totalSize)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div style={{ flex: 1, padding: '10px', border: '1px solid #c0c0c0', marginLeft: '10px' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>Add New Content</h3>
              <form onSubmit={handleAddContent}>
                <div style={{ marginBottom: '10px' }}>
                  <label htmlFor="cid" style={{ display: 'block', marginBottom: '5px' }}>
                    CID:
                  </label>
                  <input 
                    id="cid"
                    type="text" 
                    value={newCid} 
                    onChange={(e) => setNewCid(e.target.value)} 
                    className="input-98"
                    style={{ width: '100%' }}
                    placeholder="Qm..."
                    required
                  />
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <label htmlFor="filename" style={{ display: 'block', marginBottom: '5px' }}>
                    Filename (optional):
                  </label>
                  <input 
                    id="filename"
                    type="text" 
                    value={newFilename} 
                    onChange={(e) => setNewFilename(e.target.value)} 
                    className="input-98"
                    style={{ width: '100%' }}
                    placeholder="example.jpg"
                  />
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <label htmlFor="contentType" style={{ display: 'block', marginBottom: '5px' }}>
                    Content Type (optional):
                  </label>
                  <input 
                    id="contentType"
                    type="text" 
                    value={newContentType} 
                    onChange={(e) => setNewContentType(e.target.value)} 
                    className="input-98"
                    style={{ width: '100%' }}
                    placeholder="image/jpeg"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn-98" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding...' : 'Add Content'}
                </button>
              </form>
            </div>
          </div>

          <h3>Your IPFS Content</h3>
          
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div className="loading-98"></div>
            </div>
          ) : content.length === 0 ? (
            <p>You don't have any IPFS content yet. Add some using the form above.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#c0c0c0' }}>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Filename</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>CID</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Type</th>
                  <th style={{ padding: '8px', textAlign: 'right' }}>Size</th>
                  <th style={{ padding: '8px', textAlign: 'center' }}>Pinned</th>
                  <th style={{ padding: '8px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {content.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #c0c0c0' }}>
                    <td style={{ padding: '8px' }}>{item.filename || 'Unnamed'}</td>
                    <td style={{ padding: '8px' }}>
                      <a 
                        href={`https://ipfs.io/ipfs/${item.cid}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {item.cid.substring(0, 10)}...
                      </a>
                    </td>
                    <td style={{ padding: '8px' }}>{item.content_type || 'Unknown'}</td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>{formatFileSize(item.size)}</td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>
                      <input 
                        type="checkbox" 
                        checked={item.pinned} 
                        onChange={() => handleTogglePin(item.cid, item.pinned)}
                        aria-label={`Pin ${item.filename || 'content'}`}
                      />
                    </td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>
                      <button 
                        className="btn-98 btn-small" 
                        onClick={() => handleDelete(item.cid)}
                        aria-label={`Delete ${item.filename || 'content'}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
