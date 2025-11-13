'use client';

import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { api } from '@/lib/api';

interface User {
  id: number;
  username: string;
  email?: string;
  created_at: string;
}

interface Profile {
  display_name?: string;
  bio?: string;
  avatar_url?: string;
}

interface UserWithProfile extends User {
  profile?: Profile;
}

export default function Browse() {
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12;

  useEffect(() => {
    loadUsers();
  }, [currentPage]);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const offset = (currentPage - 1) * usersPerPage;
      const response = await api.user.listUsers({ limit: usersPerPage, offset });
      if (response.data?.users) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.username.toLowerCase().includes(searchLower) ||
      user.profile?.display_name?.toLowerCase().includes(searchLower) ||
      user.profile?.bio?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="win98-desktop">
      <Navigation />

      <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 20px' }}>
        {/* Page Header */}
        <div className="window" style={{ marginBottom: '20px' }}>
          <div className="window-title">
            <span>Browse Sites - Internet Explorer</span>
            <span>×</span>
          </div>
          <div className="window-content">
            <h1 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>🌐 Browse Sites</h1>
            <p>Discover amazing personal websites from creators around the world.</p>
          </div>
        </div>

        {/* Search Window */}
        <div className="window" style={{ marginBottom: '20px' }}>
          <div className="window-title">
            <span>Search</span>
            <span>×</span>
          </div>
          <div className="window-content">
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Search by username, name, or bio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  padding: '5px',
                  border: '2px inset',
                  fontFamily: 'monospace'
                }}
              />
              <button className="btn-98" onClick={loadUsers}>
                🔍 Search
              </button>
            </div>
          </div>
        </div>

        {/* User Grid */}
        {isLoading ? (
          <div className="window">
            <div className="window-content" style={{ textAlign: 'center', padding: '40px' }}>
              <div className="loading-98" style={{ margin: '0 auto 20px' }}></div>
              <p>Loading sites...</p>
            </div>
          </div>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '20px'
            }}>
              {filteredUsers.map((user) => (
                <div key={user.id} className="window">
                  <div className="window-title">
                    <span>@{user.username}</span>
                    <span>×</span>
                  </div>
                  <div className="window-content">
                    {user.profile?.avatar_url && (
                      <div style={{
                        width: '100%',
                        height: '150px',
                        background: `url(${user.profile.avatar_url}) center/cover`,
                        marginBottom: '10px',
                        border: '2px inset'
                      }} />
                    )}
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>
                      {user.profile?.display_name || user.username}
                    </h3>
                    {user.profile?.bio && (
                      <p style={{
                        margin: '0 0 10px 0',
                        fontSize: '12px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {user.profile.bio}
                      </p>
                    )}
                    <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                      <Link href={`/users/${user.username}`} className="btn-98" style={{ flex: 1, textAlign: 'center' }}>
                        Visit Site
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <div className="window">
                <div className="window-content" style={{ textAlign: 'center', padding: '40px' }}>
                  <p>No sites found. Try a different search term.</p>
                </div>
              </div>
            )}

            {/* Pagination */}
            <div className="window">
              <div className="window-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    className="btn-98"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    ← Previous
                  </button>
                  <span>Page {currentPage}</span>
                  <button
                    className="btn-98"
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={users.length < usersPerPage}
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Status Bar */}
      <div className="status-bar-98">
        <div>Found {filteredUsers.length} sites</div>
        <div>Page {currentPage}</div>
      </div>
    </div>
  );
}
