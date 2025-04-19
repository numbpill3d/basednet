'use client';

import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';

interface Stats {
  totalSites: number;
  activeToday: number;
  webrings: number;
  ipfsNodes: number;
}

export default function Home() {
  const { isAuthenticated, user, profile } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalSites: 88888,
    activeToday: 1337,
    webrings: 42,
    ipfsNodes: 404
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      api.ipfs.getContent()
        .then(response => {
          if (response.data?.stats) {
            console.log('IPFS stats:', response.data.stats);
          }
        })
        .catch(error => {
          console.error('Error fetching IPFS stats:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isAuthenticated]);

  return (
    <div className="nekoweb-container">
      <Navigation />
      <div className="nekoweb-section">
        <h2>Welcome to BasedNet</h2>
        <p>Your decentralized web experience.</p>
        {isAuthenticated && (
          <p>Welcome back, {profile?.display_name || user?.username}!</p>
        )}
      </div>
      <div className="nekoweb-grid">
        <div className="nekoweb-grid-item">
          <h3>Browse Sites</h3>
          <p>Explore the BasedNet network.</p>
          <a href="/browse" className="nekoweb-button">Browse</a>
        </div>
        <div className="nekoweb-grid-item">
          <h3>Webrings</h3>
          <p>Join a webring community.</p>
          <a href="/webrings" className="nekoweb-button">Webrings</a>
        </div>
        <div className="nekoweb-grid-item">
          <h3>My Dashboard</h3>
          <p>Manage your content.</p>
          {isAuthenticated ? (
            <a href="/dashboard" className="nekoweb-button">Dashboard</a>
          ) : (
            <p>Please log in to access your dashboard.</p>
          )}
        </div>
      </div>
    </div>
  );
}
