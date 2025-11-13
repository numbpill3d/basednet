'use client';

import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';

interface Webring {
  id: number;
  name: string;
  description: string;
  creator_id: number;
  member_count?: number;
  members?: any[];
}

export default function Webrings() {
  const { isAuthenticated, user } = useAuth();
  const [webrings, setWebrings] = useState<Webring[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWebring, setNewWebring] = useState({ name: '', description: '' });
  const [selectedWebring, setSelectedWebring] = useState<Webring | null>(null);

  useEffect(() => {
    loadWebrings();
  }, []);

  const loadWebrings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/webrings');
      const data = await response.json();
      if (data.data) {
        setWebrings(data.data);
      }
    } catch (error) {
      console.error('Error loading webrings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createWebring = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/webrings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWebring)
      });

      if (response.ok) {
        setNewWebring({ name: '', description: '' });
        setShowCreateForm(false);
        loadWebrings();
      }
    } catch (error) {
      console.error('Error creating webring:', error);
    }
  };

  const joinWebring = async (id: number) => {
    try {
      const response = await fetch(`/api/webrings/${id}/join`, {
        method: 'POST'
      });

      if (response.ok) {
        loadWebrings();
        alert('Successfully joined webring!');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to join webring');
      }
    } catch (error) {
      console.error('Error joining webring:', error);
    }
  };

  const leaveWebring = async (id: number) => {
    if (!confirm('Are you sure you want to leave this webring?')) return;

    try {
      const response = await fetch(`/api/webrings/${id}/join`, {
        method: 'DELETE'
      });

      if (response.ok) {
        loadWebrings();
        alert('Successfully left webring');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to leave webring');
      }
    } catch (error) {
      console.error('Error leaving webring:', error);
    }
  };

  const viewWebringDetails = async (webring: Webring) => {
    try {
      const response = await fetch(`/api/webrings/${webring.id}`);
      const data = await response.json();
      if (data.data) {
        setSelectedWebring(data.data);
      }
    } catch (error) {
      console.error('Error fetching webring details:', error);
    }
  };

  return (
    <div className="win98-desktop">
      <Navigation />

      <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 20px' }}>
        {/* Page Header */}
        <div className="window" style={{ marginBottom: '20px' }}>
          <div className="window-title">
            <span>Webrings - Netscape Navigator</span>
            <span>×</span>
          </div>
          <div className="window-content">
            <h1 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>🔗 Webrings</h1>
            <p>Join communities of like-minded creators and discover new sites through interconnected networks.</p>
            {isAuthenticated && (
              <button
                className="btn-98"
                onClick={() => setShowCreateForm(!showCreateForm)}
                style={{ marginTop: '10px' }}
              >
                {showCreateForm ? 'Cancel' : '+ Create New Webring'}
              </button>
            )}
          </div>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <div className="window" style={{ marginBottom: '20px' }}>
            <div className="window-title">
              <span>Create New Webring</span>
              <span onClick={() => setShowCreateForm(false)} style={{ cursor: 'pointer' }}>×</span>
            </div>
            <div className="window-content">
              <form onSubmit={createWebring}>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
                  <input
                    type="text"
                    value={newWebring.name}
                    onChange={(e) => setNewWebring({ ...newWebring, name: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '5px',
                      border: '2px inset',
                      fontFamily: 'monospace'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
                  <textarea
                    value={newWebring.description}
                    onChange={(e) => setNewWebring({ ...newWebring, description: e.target.value })}
                    required
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '5px',
                      border: '2px inset',
                      fontFamily: 'monospace'
                    }}
                  />
                </div>
                <button type="submit" className="btn-98">Create Webring</button>
              </form>
            </div>
          </div>
        )}

        {/* Webring Details Modal */}
        {selectedWebring && (
          <div className="window" style={{ marginBottom: '20px' }}>
            <div className="window-title">
              <span>{selectedWebring.name} - Details</span>
              <span onClick={() => setSelectedWebring(null)} style={{ cursor: 'pointer' }}>×</span>
            </div>
            <div className="window-content">
              <p><strong>Description:</strong> {selectedWebring.description}</p>
              <p><strong>Members:</strong> {selectedWebring.members?.length || 0}</p>
              {selectedWebring.members && selectedWebring.members.length > 0 && (
                <div>
                  <h3>Members:</h3>
                  <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                    {selectedWebring.members.map((member: any) => (
                      <li key={member.user_id}>
                        {member.display_name || member.username} (@{member.username})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Webrings List */}
        {isLoading ? (
          <div className="window">
            <div className="window-content" style={{ textAlign: 'center', padding: '40px' }}>
              <div className="loading-98" style={{ margin: '0 auto 20px' }}></div>
              <p>Loading webrings...</p>
            </div>
          </div>
        ) : webrings.length === 0 ? (
          <div className="window">
            <div className="window-content" style={{ textAlign: 'center', padding: '40px' }}>
              <p>No webrings found. {isAuthenticated && 'Be the first to create one!'}</p>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {webrings.map((webring) => (
              <div key={webring.id} className="window">
                <div className="window-title">
                  <span>{webring.name}</span>
                  <span>×</span>
                </div>
                <div className="window-content">
                  <p style={{ marginBottom: '10px' }}>{webring.description}</p>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                    👥 {webring.member_count || 0} members
                  </p>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    <button
                      className="btn-98"
                      onClick={() => viewWebringDetails(webring)}
                    >
                      View Details
                    </button>
                    {isAuthenticated && (
                      <>
                        <button
                          className="btn-98"
                          onClick={() => joinWebring(webring.id)}
                        >
                          Join
                        </button>
                        <button
                          className="btn-98"
                          onClick={() => leaveWebring(webring.id)}
                        >
                          Leave
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="status-bar-98">
        <div>{webrings.length} webrings available</div>
        <div>{isAuthenticated ? `Logged in as ${user?.username}` : 'Not logged in'}</div>
      </div>
    </div>
  );
}
