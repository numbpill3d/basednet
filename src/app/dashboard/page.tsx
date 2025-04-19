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

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [authLoading, isAuthenticated, router]);

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

      setNewCid('');
      setNewFilename('');
      setNewContentType('');
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
      
      setContent(prevContent => 
        prevContent.map(item => 
          item.cid === cid ? { ...item, pinned: !currentPinned } : item
        )
      );
      
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
      <div className="nekoweb-container">
        <Navigation />
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className="nekoweb-container">
      <Navigation />
      
      {error && (
        <div style={{ backgroundColor: '#ffdddd', border: '1px solid #ff0000', padding: '10px', marginBottom: '15px' }}>
          Error: {error}
        </div>
      )}
      
      <h2>Your IPFS Content</h2>
      
      {isLoading ? (
        <p>Loading...</p>
      ) : content.length === 0 ? (
        <p>You don't have any IPFS content yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Filename</th>
              <th>CID</th>
              <th>Type</th>
              <th>Size</th>
              <th>Pinned</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {content.map((item) => (
              <tr key={item.id}>
                <td>{item.filename || 'Unnamed'}</td>
                <td>
                  <a href={`https://ipfs.io/ipfs/${item.cid}`} target="_blank" rel="noopener noreferrer">
                    {item.cid.substring(0, 10)}...
                  </a>
                </td>
                <td>{item.content_type || 'Unknown'}</td>
                <td>{formatFileSize(item.size)}</td>
                <td>
                  <input 
                    type="checkbox" 
                    checked={item.pinned} 
                    onChange={() => handleTogglePin(item.cid, item.pinned)}
                    aria-label={`Pin ${item.filename || 'content'}`}
                  />
                </td>
                <td>
                  <button 
                    className="nekoweb-button" 
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
  );
}
