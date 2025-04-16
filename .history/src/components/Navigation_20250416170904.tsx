'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Navigation() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  const [showStartMenu, setShowStartMenu] = useState(false);

  const toggleStartMenu = () => {
    setShowStartMenu(!showStartMenu);
  };

  const closeStartMenu = () => {
    setShowStartMenu(false);
  };

  return (
    <nav className="navbar-98">
      {/* Start button with Windows 98 logo */}
      <button 
        className={`btn-98 start-button ${showStartMenu ? 'active' : ''}`} 
        onClick={toggleStartMenu}
      >
        <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAJ1JREFUOE+tk9sNgCAMRWFwDkZgNEZyFzuKiZN8vVDrtbFJSSCF9pygJ4yqHqkRY0yR1iOVyegxTmIQkRhC2P0MNhc7cMmFQdLMTFGwYuAwDTLzioARpEDiWqCCoW0TL3GroJNiYCa3CnrYNoQmV8E0JGA9WtD7XrYK7sBfQKtgkgBItQqGvx7rYHM+VHiCH0PrFTbA9vyfeICTtFYJ8EWGGdZg+/LiAAAAAElFTkSuQmCC" 
          alt="Windows 98 logo"
        />
        Start
      </button>

      {/* Start menu */}
      {showStartMenu && (
        <div className="start-menu">
          <div className="start-menu-sidebar">
            BASEDNET
          </div>
          <div className="start-menu-items">
            <div className="start-menu-item" onClick={closeStartMenu}>
              <img 
}
