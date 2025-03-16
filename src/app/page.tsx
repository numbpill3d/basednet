'use client';
import React from 'react';

export default function Home() {
  return (
    <div className="win98-desktop">
      {/* Navigation Bar */}
      <nav className="navbar-98">
        <button className="btn-98">Start</button>
        <div style={{ marginLeft: '10px' }}>|</div>
        <button className="btn-98">My Sites</button>
        <button className="btn-98">Browse</button>
        <button className="btn-98">Webrings</button>
        <button className="btn-98">Help</button>
      </nav>

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
              <button className="btn-98">Upload Files</button>
              <button className="btn-98">New Folder</button>
              <button className="btn-98">Edit HTML</button>
            </div>
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
            <table>
              <tbody>
                <tr>
                  <td>Total Sites:</td>
                  <td>88,888</td>
                </tr>
                <tr>
                  <td>Active Today:</td>
                  <td>1,337</td>
                </tr>
                <tr>
                  <td>Webrings:</td>
                  <td>42</td>
                </tr>
                <tr>
                  <td>IPFS Nodes:</td>
                  <td>404</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar-98">
        <div>Connected to IPFS Network</div>
        <div>
          <span className="loading-98" style={{ marginRight: '8px' }}></span>
          Syncing with 404 peers
        </div>
      </div>
    </div>
  )
}