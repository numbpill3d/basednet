'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function Help() {
  return (
    <div className="win98-desktop">
      <Navigation />

      <div style={{ maxWidth: '900px', margin: '20px auto', padding: '0 20px' }}>
        {/* Page Header */}
        <div className="window" style={{ marginBottom: '20px' }}>
          <div className="window-title">
            <span>Basednet Help - Windows Help</span>
            <span>×</span>
          </div>
          <div className="window-content">
            <h1 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>❓ Help & Documentation</h1>
            <p>Welcome to Basednet! Learn how to use the platform and create your own space on the indie web.</p>
          </div>
        </div>

        {/* Getting Started */}
        <div className="window" style={{ marginBottom: '20px' }}>
          <div className="window-title">
            <span>Getting Started</span>
            <span>×</span>
          </div>
          <div className="window-content">
            <h2 style={{ marginTop: 0 }}>What is Basednet?</h2>
            <p>
              Basednet is a modern platform for creating personal websites with decentralized hosting,
              community features, and a nostalgic Windows 98 aesthetic. It combines the best of Web 1.0's
              indie spirit with Web3's decentralization.
            </p>
            <h3>Key Features:</h3>
            <ul>
              <li><strong>Personal Websites:</strong> Create and customize your own space on the web</li>
              <li><strong>IPFS Hosting:</strong> Decentralized P2P content hosting</li>
              <li><strong>Webrings:</strong> Join communities and discover new sites</li>
              <li><strong>Custom Design:</strong> Add your own HTML and CSS</li>
            </ul>
          </div>
        </div>

        {/* Account Setup */}
        <div className="window" style={{ marginBottom: '20px' }}>
          <div className="window-title">
            <span>Account Setup</span>
            <span>×</span>
          </div>
          <div className="window-content">
            <h2 style={{ marginTop: 0 }}>Creating Your Account</h2>
            <ol>
              <li>Click the "Login" button in the navigation bar</li>
              <li>Sign in using IndieAuth (you'll need a personal domain or identity)</li>
              <li>Complete your profile with a display name, bio, and avatar</li>
              <li>Start customizing your site!</li>
            </ol>
          </div>
        </div>

        {/* Profile Customization */}
        <div className="window" style={{ marginBottom: '20px' }}>
          <div className="window-title">
            <span>Profile Customization</span>
            <span>×</span>
          </div>
          <div className="window-content">
            <h2 style={{ marginTop: 0 }}>Customizing Your Profile</h2>
            <p>Go to <Link href="/profile" style={{ color: 'blue', textDecoration: 'underline' }}>Profile Settings</Link> to:</p>
            <ul>
              <li><strong>Display Name:</strong> Choose how you want to be known</li>
              <li><strong>Bio:</strong> Tell visitors about yourself</li>
              <li><strong>Avatar:</strong> Add a profile picture</li>
              <li><strong>Social Links:</strong> Connect your GitHub, Twitter, and personal website</li>
              <li><strong>Custom CSS:</strong> Style your profile with custom stylesheets</li>
              <li><strong>Custom HTML:</strong> Add custom content to your page</li>
            </ul>
          </div>
        </div>

        {/* IPFS Content */}
        <div className="window" style={{ marginBottom: '20px' }}>
          <div className="window-title">
            <span>IPFS Content Management</span>
            <span>×</span>
          </div>
          <div className="window-content">
            <h2 style={{ marginTop: 0 }}>Managing Your IPFS Content</h2>
            <p>Visit the <Link href="/dashboard" style={{ color: 'blue', textDecoration: 'underline' }}>Dashboard</Link> to:</p>
            <ul>
              <li><strong>Add Content:</strong> Enter IPFS CIDs for your hosted files</li>
              <li><strong>Pin Content:</strong> Keep important files permanently available</li>
              <li><strong>Track Usage:</strong> Monitor your content storage and pinning</li>
              <li><strong>Delete Content:</strong> Remove unwanted files from tracking</li>
            </ul>
            <h3>What is IPFS?</h3>
            <p>
              IPFS (InterPlanetary File System) is a peer-to-peer protocol for storing and sharing files
              in a distributed file system. Your content is identified by its cryptographic hash (CID)
              and can be accessed from any IPFS node.
            </p>
          </div>
        </div>

        {/* Webrings */}
        <div className="window" style={{ marginBottom: '20px' }}>
          <div className="window-title">
            <span>Webrings</span>
            <span>×</span>
          </div>
          <div className="window-content">
            <h2 style={{ marginTop: 0 }}>Joining and Creating Webrings</h2>
            <p>
              Webrings are groups of related websites linked together in a circular structure.
              They're a classic Web 1.0 way to discover new content!
            </p>
            <h3>How to Use Webrings:</h3>
            <ul>
              <li><strong>Browse:</strong> Visit the <Link href="/webrings" style={{ color: 'blue', textDecoration: 'underline' }}>Webrings page</Link> to see available communities</li>
              <li><strong>Join:</strong> Click "Join" on any webring to become a member</li>
              <li><strong>Create:</strong> Start your own webring around a topic you care about</li>
              <li><strong>Navigate:</strong> Use Previous/Random/Next buttons to explore member sites</li>
            </ul>
          </div>
        </div>

        {/* Browsing Sites */}
        <div className="window" style={{ marginBottom: '20px' }}>
          <div className="window-title">
            <span>Discovering Sites</span>
            <span>×</span>
          </div>
          <div className="window-content">
            <h2 style={{ marginTop: 0 }}>Browse and Discover</h2>
            <p>
              Use the <Link href="/browse" style={{ color: 'blue', textDecoration: 'underline' }}>Browse page</Link> to:
            </p>
            <ul>
              <li>Search for users by username, name, or bio</li>
              <li>Explore recently active sites</li>
              <li>Find creators with similar interests</li>
              <li>Visit their custom pages</li>
            </ul>
          </div>
        </div>

        {/* FAQ */}
        <div className="window" style={{ marginBottom: '20px' }}>
          <div className="window-title">
            <span>Frequently Asked Questions</span>
            <span>×</span>
          </div>
          <div className="window-content">
            <h2 style={{ marginTop: 0 }}>FAQ</h2>
            <h3>Is Basednet free?</h3>
            <p>Yes! Basednet is a free platform for creating and hosting your personal website.</p>

            <h3>Do I need to know how to code?</h3>
            <p>
              Not necessarily! You can use the basic profile settings without any coding knowledge.
              However, if you want full customization, knowledge of HTML and CSS is helpful.
            </p>

            <h3>What is IndieAuth?</h3>
            <p>
              IndieAuth is a decentralized authentication protocol that lets you use your own domain
              or identity to log in, rather than relying on centralized services.
            </p>

            <h3>Can I use my own domain?</h3>
            <p>
              Currently, custom domains are configured but the full implementation is coming soon.
              Check back for updates!
            </p>

            <h3>How do I upload files to IPFS?</h3>
            <p>
              You'll need to use an IPFS client or service (like Pinata, Infura, or a local IPFS node)
              to upload files. Once uploaded, you'll receive a CID that you can add to your Basednet dashboard.
            </p>
          </div>
        </div>

        {/* Support */}
        <div className="window" style={{ marginBottom: '20px' }}>
          <div className="window-title">
            <span>Support & Community</span>
            <span>×</span>
          </div>
          <div className="window-content">
            <h2 style={{ marginTop: 0 }}>Need Help?</h2>
            <p>If you have questions or need support:</p>
            <ul>
              <li>Check this help page for common questions</li>
              <li>Join a webring to connect with other users</li>
              <li>Report bugs or request features on our GitHub repository</li>
            </ul>
            <p style={{ marginTop: '20px', padding: '10px', background: '#c0c0c0', border: '2px inset' }}>
              <strong>Remember:</strong> Basednet celebrates the indie web spirit. Be creative, be authentic,
              and have fun building your corner of the internet!
            </p>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar-98">
        <div>Help & Documentation</div>
        <div>Need more help? Check the FAQ section above</div>
      </div>
    </div>
  );
}
