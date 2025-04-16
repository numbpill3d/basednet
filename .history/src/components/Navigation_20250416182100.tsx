'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Navigation() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showStartMenu, setShowStartMenu] = useState(false);

  // Update clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };

    updateClock();
    const intervalId = setInterval(updateClock, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleStartMenu = () => {
    setShowStartMenu(!showStartMenu);
  };

  // Close start menu when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = () => {
      if (showStartMenu) setShowStartMenu(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showStartMenu]);

  // Start Menu component
  const StartMenu = () => (
    <div className="start-menu" onClick={(e) => e.stopPropagation()}>
      <div className="start-menu-sidebar">
        BasedNet
      </div>
      <div className="start-menu-items">
        <Link href="/" className="start-menu-item" onClick={() => setShowStartMenu(false)}>
          <span className="pixel-art">🏠</span> Home
        </Link>
        <Link href="/browse" className="start-menu-item" onClick={() => setShowStartMenu(false)}>
          <span className="pixel-art">🌐</span> Browse Sites
        </Link>
        <Link href="/webrings" className="start-menu-item" onClick={() => setShowStartMenu(false)}>
          <span className="pixel-art">⭕</span> Webrings
        </Link>
        
        <div className="separator-98"></div>
        
        {isAuthenticated ? (
          <>
            <Link href="/dashboard" className="start-menu-item" onClick={() => setShowStartMenu(false)}>
              <span className="pixel-art">📊</span> My Dashboard
            </Link>
            <Link href="/profile" className="start-menu-item" onClick={() => setShowStartMenu(false)}>
              <span className="pixel-art">👤</span> User Profile
            </Link>
            <div className="separator-98"></div>
            <div className="start-menu-item" onClick={() => {logout(); setShowStartMenu(false);}}>
              <span className="pixel-art">🚪</span> Log Off ({user?.username})
            </div>
          </>
        ) : (
          <div className="start-menu-item" onClick={() => {login(); setShowStartMenu(false);}}>
            <span className="pixel-art">🔑</span> Log In
          </div>
        )}
        
        <div className="separator-98"></div>
        
        <Link href="/help" className="start-menu-item" onClick={() => setShowStartMenu(false)}>
          <span className="pixel-art">❓</span> Help
        </Link>
      </div>
    </div>
  );

  return (
    <div className="navbar-98">
      <div className="start-button btn-98" onClick={(e) => {e.stopPropagation(); toggleStartMenu();}}>
        <span className="pixel-art">🪟</span> Start
      </div>
      
      {showStartMenu && <StartMenu />}
      
      <div className="separator-98" style={{ height: '22px', width: '1px', margin: '0 4px' }}></div>
      
      {/* Quick launch icons */}
      <Link href="/" className="btn-98" title="Home">
        <span className="pixel-art">🏠</span>
      </Link>
      <Link href="/browse" className="btn-98" title="Browse">
        <span className="pixel-art">🌐</span>
      </Link>
      <Link href="/webrings" className="btn-98" title="Webrings">
        <span className="pixel-art">⭕</span>
      </Link>
      
      {/* Task buttons would go here in a real Windows 98 system */}
      <div style={{ flex: 1 }}></div>
      
      {isLoading ? (
        <div className="loading-98" style={{ marginRight: '10px' }}></div>
      ) : null}
      
      {/* System tray */}
      <div className="system-tray">
        <div className="tray-icon" title="Connected to IPFS Network">
          <span className="pixel-art">📡</span>
        </div>
        <div className="win98-clock">
          {currentTime}
        </div>
      </div>
    </div>
  );
}
