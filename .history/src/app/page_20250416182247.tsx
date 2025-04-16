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
  const [currentTime, setCurrentTime] = useState('');

  // Desktop icons state
  const [desktopIcons] = useState([
    { name: 'My Website', icon: '🌐' },
    { name: 'Create Site', icon: '📝' },
    { name: 'Webrings', icon: '⭕' },
    { name: 'Help', icon: '❓' }
  ]);

  // Update clock display
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString([], {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

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
      {/* Desktop Icons */}
      <div style={{ padding: '10px' }}>
        {desktopIcons.map((icon, index) => (
          <div key={index} className="desktop-icon">
            <div className="pixel-art" style={{ fontSize: '32px' }}>{icon.icon}</div>
            <div className="desktop-icon-label">{icon.name}</div>
          </div>
        ))}
      </div>

      {/* ASCII Art Logo Window */}
      <div className="window" style={{ maxWidth: '600px', margin: '20px auto' }}>
        <div className="window-title">
          <div className="title-text">
            <span className="pixel-art" style={{ marginRight: '5px' }}>📟</span>
            BASEDNET.EXE
          </div>
          <div className="window-controls">
            <div className="window-control">_</div>
            <div className="window-control">□</div>
            <div className="window-control">×</div>
          </div>
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
          <div className="alert-98">
            <div className="pixel-art" style={{ fontSize: '32px', marginRight: '10px' }}>💾</div>
            <div className="alert-98-content">
              <p style={{ marginBottom: '5px' }}><b>Web 1.0 Lives Forever</b></p>
              <p>Create, host, and share your personal website with BasedNet</p>
              
              {isAuthenticated && (
                <p style={{ marginTop: '10px' }}>
                  Welcome back, <b>{profile?.display_name || user?.username}!</b>
                </p>
              )}
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--win98-darker)', padding: '5px 10px', fontSize: '10px', color: 'var(--win98-darker)' }}>
          System: Ready | Memory: 640K OK | {currentTime}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid-98">
        {/* Active Sites Window */}
        <div className="window">
          <div className="window-title">
            <div className="title-text">
              <span className="pixel-art" style={{ marginRight: '5px' }}>🌐</span>
              Active Sites
            </div>
            <div className="window-controls">
              <div className="window-control">_</div>
              <div className="window-control">□</div>
              <div className="window-control">×</div>
            </div>
          </div>
          <div className="window-content">
            <div className="address-bar">
              <label>Address:</label>
              <input type="text" value="C:\BASEDNET\ACTIVE_SITES.HTM" readOnly />
              <button className="btn-98 btn-small">Go</button>
            </div>
            
            <div className="tabs-98">
              <div className="tab-98 active">Sites</div>
              <div className="tab-98">Details</div>
              <div className="tab-98">Preview</div>
            </div>
            <div className="tab-content-98">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '20px' }}></th>
                    <th>Site</th>
                    <th>Last Updated</th>
                    <th>Views</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="pixel-art">📄</span></td>
                    <td><a href="#">cool-site-88</a></td>
                    <td>2 hours ago</td>
                    <td>1,337</td>
                  </tr>
                  <tr>
                    <td><span className="pixel-art">📄</span></td>
                    <td><a href="#">retro-haven</a></td>
                    <td>5 hours ago</td>
                    <td>420</td>
                  </tr>
                  <tr>
                    <td><span className="pixel-art">📄</span></td>
                    <td><a href="#">pixel-dreams</a></td>
                    <td>8 hours ago</td>
                    <td>808</td>
                  </tr>
                  <tr>
                    <td><span className="pixel-art">📄</span></td>
                    <td><a href="#">win98-museum</a></td>
                    <td>1 day ago</td>
                    <td>1,024</td>
                  </tr>
                  <tr>
                    <td><span className="pixel-art">📄</span></td>
                    <td><a href="#">digital-nostalgia</a></td>
                    <td>2 days ago</td>
                    <td>512</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: '10px' }}>
              <button className="btn-98">Refresh</button>
              <button className="btn-98">View Site</button>
              <button className="btn-98">Properties</button>
            </div>
          </div>
        </div>

        {/* File Manager */}
        <div className="window">
          <div className="window-title">
            <div className="title-text">
              <span className="pixel-art" style={{ marginRight: '5px' }}>📂</span>
              Site Manager
            </div>
            <div className="window-controls">
              <div className="window-control">_</div>
              <div className="window-control">□</div>
              <div className="window-control">×</div>
            </div>
          </div>
          <div className="window-content">
            <div className="address-bar">
              <label>Location:</label>
              <input type="text" value="C:\BASEDNET\MY_SITE\" readOnly />
              <button className="btn-98 btn-small">Go</button>
            </div>
            
            <div className="window-toolbar" style={{ display: 'flex', marginBottom: '10px', borderBottom: '1px solid var(--win98-darker)', paddingBottom: '5px' }}>
              <button className="btn-98" disabled={!isAuthenticated}>
                <span className="pixel-art" style={{ marginRight: '3px' }}>📤</span> Upload
              </button>
              <button className="btn-98" disabled={!isAuthenticated}>
                <span className="pixel-art" style={{ marginRight: '3px' }}>📁</span> New Folder
              </button>
              <button className="btn-98" disabled={!isAuthenticated}>
                <span className="pixel-art" style={{ marginRight: '3px' }}>📝</span> Edit
              </button>
              <button className="btn-98" disabled={!isAuthenticated}>
                <span className="pixel-art" style={{ marginRight: '3px' }}>❌</span> Delete
              </button>
            </div>
            
            {isAuthenticated ? (
              <div className="folder-view">
                <div className="folder-item">
                  <span className="pixel-art" style={{ fontSize: '32px' }}>📁</span>
                  <span>images</span>
                </div>
                <div className="folder-item">
                  <span className="pixel-art" style={{ fontSize: '32px' }}>📄</span>
                  <span>index.html</span>
                </div>
                <div className="folder-item">
                  <span className="pixel-art" style={{ fontSize: '32px' }}>📄</span>
                  <span>style.css</span>
                </div>
                <div className="folder-item">
                  <span className="pixel-art" style={{ fontSize: '32px' }}>📄</span>
                  <span>script.js</span>
                </div>
                <div className="folder-item">
                  <span className="pixel-art" style={{ fontSize: '32px' }}>📄</span>
                  <span>about.html</span>
                </div>
              </div>
            ) : (
              <div className="win98-error">
                <span className="pixel-art" style={{ fontSize: '32px' }}>⚠️</span>
                <div>
                  <p><b>Access Denied</b></p>
                  <p>Please log in to manage your site files.</p>
                  <button className="btn-98" style={{ marginTop: '10px' }} onClick={() => {}}>Log In</button>
                </div>
              </div>
            )}
            
            <div style={{ fontSize: '10px', color: 'var(--win98-darker)', marginTop: '5px' }}>
              5 items | 24.5 KB used | 5.00 MB free
            </div>
          </div>
        </div>

        {/* Webring Navigator */}
        <div className="window">
          <div className="window-title">
            <div className="title-text">
              <span className="pixel-art" style={{ marginRight: '5px' }}>⭕</span>
              Webring Navigator
            </div>
            <div className="window-controls">
              <div className="window-control">_</div>
              <div className="window-control">□</div>
              <div className="window-control">×</div>
            </div>
          </div>
          <div className="window-content">
            <div className="window-toolbar" style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', borderBottom: '1px solid var(--win98-darker)', paddingBottom: '5px' }}>
              <button className="btn-98">
                <span className="pixel-art" style={{ marginRight: '3px' }}>◀</span> Previous
              </button>
              <button className="btn-98">
                <span className="pixel-art" style={{ marginRight: '3px' }}>🔀</span> Random
              </button>
              <button className="btn-98">
                Next <span className="pixel-art" style={{ marginLeft: '3px' }}>▶</span>
              </button>
            </div>
            
            <div style={{ padding: '10px', background: '#ffffff', border: '1px solid var(--win98-darker)', textAlign: 'center' }}>
              <div style={{ marginBottom: '10px' }}>
                <span className="pixel-art" style={{ fontSize: '24px' }}>⭕</span>
              </div>
              <div className="ascii-art" style={{ fontSize: '10px', lineHeight: '1.3' }}>
{`    [Your Site]
        ↓
  [Previous] → [Random] → [Next]
        ↑
    [Return]`}
              </div>
              <p style={{ marginTop: '10px', fontSize: '12px' }}>
                <b>Currently browsing:</b> Retro Web Webring
              </p>
              <p style={{ color: 'var(--win98-darker)', fontSize: '10px', marginTop: '5px' }}>
                42 sites in this webring | Position: 13/42
              </p>
            </div>
            
            <div style={{ marginTop: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '11px' }}><b>Available Webrings:</b></label>
              <select style={{ width: '100%' }}>
                <option>Retro Web Webring</option>
                <option>Pixel Art Community</option>
                <option>Indie Developers Circle</option>
                <option>Digital Gardeners</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Window */}
        <div className="window">
          <div className="window-title">
            <div className="title-text">
              <span className="pixel-art" style={{ marginRight: '5px' }}>📊</span>
              System Information
            </div>
            <div className="window-controls">
              <div className="window-control">_</div>
              <div className="window-control">□</div>
              <div className="window-control">×</div>
            </div>
          </div>
          <div className="window-content">
            <div className="tabs-98">
              <div className="tab-98 active">General</div>
              <div className="tab-98">Network</div>
              <div className="tab-98">IPFS</div>
            </div>
            <div className="tab-content-98">
              {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                  <div className="loading-98"></div>
                </div>
              ) : (
                <>
                  <table className="properties-98">
                    <tbody>
                      <tr>
                        <td>System:</td>
                        <td>BasedNet Web Platform v1.0</td>
                      </tr>
                      <tr>
                        <td>Registered Sites:</td>
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
                      <tr>
                        <td>Server Time:</td>
                        <td>{currentTime}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div style={{ marginTop: '15px' }}>
                    <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                      <label>Network Capacity:</label>
                      <span>68%</span>
                    </div>
                    <div className="progress-98">
                      <div className="progress-98-bar" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '10px', color: 'var(--win98-darker)' }}>
                    Last Updated: {new Date().toLocaleTimeString()}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar-98">
        <div className="status-item">
          <span className="pixel-art" style={{ marginRight: '5px' }}>📡</span>
          Connected to IPFS Network
        </div>
        <div className="status-item">
          <span className="loading-98" style={{ width: '12px', height: '12px', marginRight: '5px' }}></span>
          Syncing with {stats.ipfsNodes} peers
        </div>
        <div className="system-info">
          BasedNet v1.0 | Memory Available: 640K | CPU: 133MHz
        </div>
      </div>
    </div>
  );
}
