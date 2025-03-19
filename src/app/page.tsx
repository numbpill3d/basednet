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

  // Example of fetching data from the API
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      // This is just a placeholder - in a real app, you'd fetch actual stats
      api.ipfs.getContent()
        .then(response => {
          if (response.data?.stats) {
            console.log('IPFS stats:', response.data.stats);
            // Update stats with real data if available
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
    <div className="win98-desktop">
      {/* Navigation Bar */}
      <Navigation />

      {/* ASCII Art Logo */}
      <div className="window" style={{ maxWidth: '600px', margin: '20px auto' }}>
        <div className="window-title">
          <span>BASEDNET.EXE</span>
          <span>×</span>
        </div>
        <div className="window-content">
          <pre className="ascii-art retrowave-glow">
{`
 ▄▄▄▄    ▄▄▄        ██████ ▓█████ ▓█████▄  ███▄    █ ▓█████▄▄▄█████▓
▓█████▄ ▒████▄    ▒██    ▒ ▓█   ▀ ▒██▀ ██▌ ██ ▀█   █ ▓█   ▀▓  ██▒ ▓▒
▒██▒ ▄██▒██  ▀█▄  ░ ▓██▄   ▒███   ░██   █▌▓██  ▀█ ██▒▒███  ▒ ▓██░ ▒░
▒██░█▀  ░██▄▄▄▄██   ▒   ██▒▒▓█  ▄ ░▓█▄   ▌▓██▒  ▐▌██▒▒▓█  ▄░ ▓██▓ ░ 
░▓█  ▀█▓ ▓█   ▓██▒▒██████▒▒░▒████▒░▒████▓ ▒██░   ▓██░░▒████▒ ▒██▒ ░ 
░▒▓███▀▒ ▒▒   ▓▒█░▒ ▒▓▒ ▒ ░░░ ▒░ ░ ▒▒▓  ▒ ░ ▒░   ▒ ▒ ░░ ▒░ ░ ▒ ░░   
▒░▒   ░   ▒   ▒▒ ░░ ░▒  ░ ░ ░ ░  ░ ░ ▒  ▒ ░ ░░   ░ ▒░ ░ ░  ░   ░    
 ░    ░   ░   ▒   ░  ░  ░     ░    ░ ░  ░    ░   ░ ░    ░    ░      
 ░            ░  ░      ░     ░  ░   ░             ░    ░  ░         
      ░                            ░                                   
`}
          </pre>
          <p style={{ textAlign: 'center' }}>Web 1.0 Lives Forever</p>
          
          {isAuthenticated && (
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <p>Welcome back, {profile?.display_name || user?.username}!</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid-98">
        {/* Active Sites Window */}
        <div className="window">
          <div className="window-title">
            <span>Active Sites</span>
            <span>×</span>
          </div>
          <div className="window-content">
            <table>
              <thead>
                <tr>
                  <th>Site</th>
                  <th>Last Updated</th>
                  <th>Views</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><a href="#">cool-site-88</a></td>
                  <td>2 hours ago</td>
                  <td>1,337</td>
                </tr>
                <tr>
                  <td><a href="#">retro-haven</a></td>
                  <td>5 hours ago</td>
                  <td>420</td>
                </tr>
                <tr>
                  <td><a href="#">pixel-dreams</a></td>
                  <td>8 hours ago</td>
                  <td>808</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* File Manager */}
        <div className="window">
          <div className="window-title">
            <span>Site Manager</span>
            <span>×</span>
          </div>
          <div className="window-content">
            <div style={{ marginBottom: '10px' }}>
              <button className="btn-98" disabled={!isAuthenticated}>Upload Files</button>
              <button className="btn-98" disabled={!isAuthenticated}>New Folder</button>
              <button className="btn-98" disabled={!isAuthenticated}>Edit HTML</button>
            </div>
            {isAuthenticated ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>📁 images</td>
                    <td>--</td>
                    <td>Folder</td>
                  </tr>
                  <tr>
                    <td>📄 index.html</td>
                    <td>2.4 KB</td>
                    <td>HTML</td>
                  </tr>
                  <tr>
                    <td>📄 style.css</td>
                    <td>1.8 KB</td>
                    <td>CSS</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div style={{ padding: '10px', textAlign: 'center' }}>
                <p>Please log in to manage your site files.</p>
              </div>
            )}
          </div>
        </div>

        {/* Webring Navigator */}
        <div className="window">
          <div className="window-title">
            <span>Webring Navigator</span>
            <span>×</span>
          </div>
          <div className="window-content">
            <div style={{ marginBottom: '10px' }}>
              <button className="btn-98">← Previous</button>
              <button className="btn-98">Random</button>
              <button className="btn-98">Next →</button>
            </div>
            <div className="ascii-art" style={{ fontSize: '10px' }}>
{`    [Your Site]
        ↓
  [Previous] → [Random] → [Next]
        ↑
    [Return]`}
            </div>
          </div>
        </div>

        {/* Stats Window */}
        <div className="window">
          <div className="window-title">
            <span>Network Stats</span>
            <span>×</span>
          </div>
          <div className="window-content">
            {isLoading ? (
              <div className="loading-98" style={{ margin: '20px auto' }}></div>
            ) : (
              <table>
                <tbody>
                  <tr>
                    <td>Total Sites:</td>
                    <td>{stats.totalSites.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Active Today:</td>
                    <td>{stats.activeToday.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Webrings:</td>
                    <td>{stats.webrings.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>IPFS Nodes:</td>
                    <td>{stats.ipfsNodes.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar-98">
        <div>Connected to IPFS Network</div>
        <div>
          <span className="loading-98" style={{ marginRight: '8px' }}></span>
          Syncing with {stats.ipfsNodes} peers
        </div>
      </div>
    </div>
  )
}
