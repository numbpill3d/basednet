'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Navigation() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();

  return (
    <nav className="navbar-98">
      <button className="btn-98">Start</button>
      <div style={{ marginLeft: '10px' }}>|</div>
      <Link href="/" className="btn-98">Home</Link>
      <Link href="/browse" className="btn-98">Browse</Link>
      <Link href="/webrings" className="btn-98">Webrings</Link>
      
      {isLoading ? (
        <div className="loading-98" style={{ marginLeft: 'auto' }}></div>
      ) : isAuthenticated ? (
        <>
          <Link href="/dashboard" className="btn-98">My Dashboard</Link>
          <Link href="/profile" className="btn-98">Profile</Link>
          <button 
            className="btn-98" 
            style={{ marginLeft: 'auto' }}
            onClick={() => logout()}
          >
            Logout ({user?.username})
          </button>
        </>
      ) : (
        <button 
          className="btn-98" 
          style={{ marginLeft: 'auto' }}
          onClick={() => login()}
        >
          Login
        </button>
      )}
      
      <Link href="/help" className="btn-98">Help</Link>
    </nav>
  );
}
