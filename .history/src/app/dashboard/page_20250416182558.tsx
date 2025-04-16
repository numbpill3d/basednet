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
  const [activeTab, setActiveTab] = useState('content'); // 'content', 'upload', 'stats'

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (authLoading) {
    return (
      <div className="win98-desktop">
        <Navigation />
        <div className="window" style={{ maxWidth: '600px', margin: '20px auto' }}>
          <div className="window-title">
            <div className="title-text">
              <span className="pixel-art" style={{ marginRight: '5px' }}>⏳</span>
              Loading...
            </div>
            <div className="window-controls">
              <div className="window-control">×</div>
            </div>
          </div>
          <div className="window-content" style={{ textAlign: 'center', padding: '20px' }}>
            <div className="loading-98"></div>
            <p style={{ marginTop: '10px' }}>Connecting to IPFS network...</p>
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
          <div className="title-text">
            <span className="pixel-art" style={{ marginRight: '5px' }}>📡</span>
            IPFS Content Dashboard
          </div>
          <div className="window-controls">
            <div className="window-control">_</div>
            <div className="window-control">□</div>
            <div className="window-control">×</div>
          </div>
        </div>
        <div className="window-content">
          {error && (
            <div className="win98-error">
              <span className="pixel-art" style={{ fontSize: '24px' }}>⚠️</span>
              <div>
                <p><b>Error</b></p>
                <p>{error}</p>
              </div>
            </div>
          )}

          <div className="tabs-98">
            <div 
              className={`tab-98 ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => setActiveTab('content')}
            >
              Content
            </div>
            <div 
              className={`tab-98 ${activeTab === 'upload' ? 'active' : ''}`}
              onClick={() => setActiveTab('upload')}
            >
              Upload New
            </div>
            <div 
              className={`tab-98 ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              Statistics
            </div>
          </div>

          {activeTab === 'content' && (
            <div className="tab-content-98">
              <div className="window-toolbar" style={{ display: 'flex', marginBottom: '10px', borderBottom: '1px solid var(--win98-darker)', paddingBottom: '5px' }}>
                <button className="btn-98" onClick={fetchContent}>
                  <span className="pixel-art" style={{ marginRight: '3px' }}>🔄</span> Refresh
                </button>
                <button className="btn-98" onClick={() => setActiveTab('upload')}>
                  <span className="pixel-art" style={{ marginRight: '3px' }}>📤</span> Upload New
                </button>
                <div style={{ flex: 1 }}></div>
                <div className="status-item" style={{ height: 'auto', margin: '0' }}>
                  <span className="pixel-art" style={{ marginRight: '3px' }}>📊</span>
                  {stats.total} Files | {formatFileSize(stats.totalSize)}
                </div>
              </div>

              {isLoading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <div className="loading-98" style={{ margin: '0 auto' }}></div>
                  <p style={{ marginTop: '10px' }}>Loading IPFS content...</p>
                </div>
              ) : content.length === 0 ? (
                <div className="win98-error" style={{ backgroundColor: '#ffffcc', borderColor: '#ffcc00' }}>
                  <span className="pixel-art" style={{ fontSize: '24px' }}>ℹ️</span>
                  <div>
                    <p><b>No Content Found</b></p>
                    <p>You don't have any IPFS content yet. Add some using the Upload tab.</p>
                    <button 
                      className="btn-98" 
                      style={{ marginTop: '10px' }}
                      onClick={() => setActiveTab('upload')}
                    >
                      Add Content Now
                    </button>
                  </div>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: '25%' }}>Filename</th>
                      <th style={{ width: '30%' }}>CID</th>
                      <th style={{ width: '15%' }}>Type</th>
                      <th style={{ width: '10%', textAlign: 'right' }}>Size</th>
                      <th style={{ width: '10%', textAlign: 'center' }}>Pinned</th>
                      <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <span className="pixel-art" style={{ marginRight: '5px' }}>
                            {item.content_type?.startsWith('image/') ? '🖼️' : 
                             item.content_type?.includes('html') ? '📄' : 
                             item.content_type?.includes('css') ? '🎨' : 
                             item.content_type?.includes('javascript') ? '📜' : '📁'}
                          </span>
                          {item.filename || 'Unnamed'}
                        </td>
                        <td>
                          <div className="tooltip-98">
                            <a 
                              href={`https://ipfs.io/ipfs/${item.cid}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              {item.cid.substring(0, 12)}...
                            </a>
                            <span className="tooltip-98-text">{item.cid}</span>
                          </div>
                        </td>
                        <td>{item.content_type || 'Unknown'}</td>
                        <td style={{ textAlign: 'right' }}>{formatFileSize(item.size)}</td>
                        <td style={{ textAlign: 'center' }}>
                          <input 
                            type="checkbox" 
                            checked={item.pinned} 
                            onChange={() => handleTogglePin(item.cid, item.pinned)}
                            aria-label={`Pin ${item.filename || 'content'}`}
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button 
                            className="btn-98 btn-small" 
                            onClick={() => handleDelete(item.cid)}
                            aria-label={`Delete ${item.filename || 'content'}`}
                          >
                            <span className="pixel-art">🗑️</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <div style={{ fontSize: '10px', color: 'var(--win98-darker)', marginTop: '10px', textAlign: 'right' }}>
                Last refreshed: {new Date().toLocaleTimeString()}
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="tab-content-98">
              <div className="window" style={{ margin: '0', boxShadow: 'none', border: 'none' }}>
                <div className="window-title">
                  <div className="title-text">
                    <span className="pixel-art" style={{ marginRight: '5px' }}>📤</span>
                    Add New IPFS Content
                  </div>
                </div>
                <div className="window-content" style={{ border: '1px solid var(--win98-darker)' }}>
                  <form onSubmit={handleAddContent}>
                    <div style={{ marginBottom: '15px' }}>
                      <label htmlFor="cid" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        IPFS Content Identifier (CID):
                      </label>
                      <input 
                        id="cid"
                        type="text" 
                        value={newCid} 
                        onChange={(e) => setNewCid(e.target.value)} 
                        style={{ width: '100%' }}
                        placeholder="Qm..."
                        required
                      />
                      <p style={{ fontSize: '10px', color: 'var(--win98-darker)', marginTop: '3px' }}>
                        Example: QmX7qUgLyYKzPb3hzK4g8rR5N1TE4aYxycpK1XNvCwHbKx
                      </p>
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <label htmlFor="filename" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Filename (optional):
                      </label>
                      <input 
                        id="filename"
                        type="text" 
                        value={newFilename} 
                        onChange={(e) => setNewFilename(e.target.value)} 
                        style={{ width: '100%' }}
                        placeholder="example.jpg"
                      />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <label htmlFor="contentType" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Content Type (optional):
                      </label>
                      <input 
                        id="contentType"
                        type="text" 
                        value={newContentType} 
                        onChange={(e) => setNewContentType(e.target.value)} 
                        style={{ width: '100%' }}
                        placeholder="image/jpeg"
                      />
                      <p style={{ fontSize: '10px', color: 'var(--win98-darker)', marginTop: '3px' }}>
                        Common types: text/html, image/png, image/jpeg, application/pdf
                      </p>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <button 
                        type="button" 
                        className="btn-98" 
                        onClick={() => setActiveTab('content')}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn-98" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="loading-98" style={{ width: '10px', height: '10px', marginRight: '5px' }}></span>
                            Processing...
                          </>
                        ) : (
                          <>Add Content</>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div style={{ marginTop: '15px', padding: '10px', border: '1px solid var(--win98-darker)', backgroundColor: '#ffffcc' }}>
                <p style={{ marginBottom: '10px' }}><b>How to use IPFS with BasedNet:</b></p>
                <ol style={{ paddingLeft: '20px', fontSize: '11px' }}>
                  <li>Add your content to IPFS using an IPFS node or service</li>
                  <li>Copy the resulting CID (Content Identifier)</li>
                  <li>Paste the CID in the form above</li>
                  <li>Add optional metadata like filename and content type</li>
                  <li>Click "Add Content" to register it with BasedNet</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="tab-content-98">
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1, border: '1px solid var(--win98-darker)', padding: '10px', backgroundColor: 'white' }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', borderBottom: '1px solid var(--win98-darker)', paddingBottom: '5px' }}>
                    <span className="pixel-art" style={{ marginRight: '5px' }}>📊</span>
                    Content Statistics
                  </h3>
                  <table className="properties-98">
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
                      <tr>
                        <td>Storage Usage:</td>
                        <td>{stats.totalSize ? Math.round((stats.totalSize / (1024 * 1024 * 100)) * 100) : 0}%</td>
                      </tr>
                    </tbody>
                  </table>

                  <div style={{ marginTop: '15px' }}>
                    <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                      <label>Storage Usage:</label>
                      <span>{Math.round((stats.totalSize / (1024 * 1024 * 100)) * 100) || 0}%</span>
                    </div>
                    <div className="progress-98">
                      <div 
                        className="progress-98-bar" 
                        style={{ width: `${Math.round((stats.totalSize / (1024 * 1024 * 100)) * 100) || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1, border: '1px solid var(--win98-darker)', padding: '10px', backgroundColor: 'white' }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', borderBottom: '1px solid var(--win98-darker)', paddingBottom: '5px' }}>
                    <span className="pixel-art" style={{ marginRight: '5px' }}>🔍</span>
                    Content Types
                  </h3>
                  <div style={{ height: '150px', overflowY: 'auto', border: '1px solid var(--win98-darker)' }}>
                    <table>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Content type statistics would go here in a real app */}
                        <tr>
                          <td>image/jpeg</td>
                          <td>3</td>
                        </tr>
                        <tr>
                          <td>text/html</td>
                          <td>5</td>
                        </tr>
                        <tr>
                          <td>application/pdf</td>
                          <td>1</td>
                        </tr>
                        <tr>
                          <td>text/css</td>
                          <td>2</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '15px', padding: '10px', border: '1px solid var(--win98-darker)', backgroundColor: '#f0f0f0' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', borderBottom: '1px solid var(--win98-darker)', paddingBottom: '5px' }}>
                  <span className="pixel-art" style={{ marginRight: '5px' }}>💡</span>
                  IPFS Tips
                </h3>
                <ul style={{ paddingLeft: '20px', fontSize: '11px' }}>
                  <li><b>Pinning:</b> Content marked as "pinned" will be kept in the network even if nobody is accessing it.</li>
                  <li><b>CID:</b> Content Identifiers are unique fingerprints of your content based on its data.</li>
                  <li><b>Gateway:</b> Access your content via https://ipfs.io/ipfs/[your-cid]</li>
                  <li><b>Storage:</b> Your BasedNet account includes 100MB of pinned IPFS storage.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        
        <div style={{ borderTop: '1px solid var(--win98-darker)', padding: '5px 10px', fontSize: '10px', color: 'var(--win98-darker)', display: 'flex', justifyContent: 'space-between' }}>
          <div>IPFS Management Console v1.0</div>
          <div>{new Date().toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
