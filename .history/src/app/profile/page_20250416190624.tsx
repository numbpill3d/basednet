'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '../../components/Navigation';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../lib/api';

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, isLoading, isAuthenticated, refreshUserData } = useAuth();
  
  const [formData, setFormData] = useState({
    display_name: profile?.display_name || '',
    bio: profile?.bio || '',
    avatar_url: profile?.avatar_url || '',
    custom_css: profile?.custom_css || '',
    custom_html: profile?.custom_html || '',
  });
  
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>(
    profile?.social_links || { twitter: '', github: '', website: '' }
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('basic'); // 'basic', 'social', 'custom'
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, router]);

  // Update form data when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || '',
        custom_css: profile.custom_css || '',
        custom_html: profile.custom_html || '',
      });
      setSocialLinks(profile.social_links || { twitter: '', github: '', website: '' });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialLinks(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await api.profile.updateProfile({
        ...formData,
        social_links: socialLinks
      });

      if (response.error) {
        throw new Error(response.error);
      }

      setSuccessMessage('Profile updated successfully!');
      setLastSaved(new Date().toLocaleTimeString());
      await refreshUserData();
    } catch (err) {
      setError((err as Error).message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="win98-desktop">
        <Navigation />
        <div className="window" style={{ maxWidth: '600px', margin: '20px auto' }}>
          <div className="window-title">
            <div className="title-text">
              <span className="pixel-art" style={{ marginRight: '5px' }}>⏳</span>
              Loading...
            </div>
            <div className="window-controls">
              <div className="window-control">×</div>
            </div>
          </div>
          <div className="window-content" style={{ textAlign: 'center', padding: '20px' }}>
            <div className="loading-98"></div>
            <p style={{ marginTop: '10px' }}>Loading user profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="win98-desktop">
      <Navigation />
      
      <div className="window" style={{ maxWidth: '800px', margin: '20px auto' }}>
        <div className="window-title">
          <div className="title-text">
            <span className="pixel-art" style={{ marginRight: '5px' }}>👤</span>
            User Profile Properties
          </div>
          <div className="window-controls">
            <div className="window-control">_</div>
            <div className="window-control">□</div>
            <div className="window-control">×</div>
          </div>
        </div>
        <div className="window-content">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="win98-error">
                <span className="pixel-art" style={{ fontSize: '24px' }}>⚠️</span>
                <div>
                  <p><b>Error</b></p>
                  <p>{error}</p>
                </div>
              </div>
            )}
            
            {successMessage && (
              <div className="win98-success">
                <span className="pixel-art" style={{ fontSize: '24px' }}>✅</span>
                <div>
                  <p><b>Success</b></p>
                  <p>{successMessage}</p>
                </div>
              </div>
            )}

            <div className="tabs-98">
              <div 
                className={`tab-98 ${activeTab === 'basic' ? 'active' : ''}`}
                onClick={() => setActiveTab('basic')}
              >
                Basic Info
              </div>
              <div 
                className={`tab-98 ${activeTab === 'social' ? 'active' : ''}`}
                onClick={() => setActiveTab('social')}
              >
                Social Links
              </div>
              <div 
                className={`tab-98 ${activeTab === 'custom' ? 'active' : ''}`}
                onClick={() => setActiveTab('custom')}
              >
                Custom Code
              </div>
            </div>

            {activeTab === 'basic' && (
              <div className="tab-content-98">
                <div className="window" style={{ margin: '10px 0', boxShadow: 'none', border: 'none' }}>
                  <div className="window-title">
                    <div className="title-text">
                      <span className="pixel-art" style={{ marginRight: '5px' }}>ℹ️</span>
                      User Information
                    </div>
                  </div>
                  <div className="window-content" style={{ border: '1px solid var(--win98-darker)' }}>
                    <div style={{ marginBottom: '15px' }}>
                      <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Username:
                      </label>
                      <input 
                        id="username"
                        type="text" 
                        value={user?.username || ''} 
                        disabled 
                        style={{ width: '100%', backgroundColor: '#f0f0f0' }}
                      />
                      <p style={{ fontSize: '10px', color: 'var(--win98-darker)', marginTop: '3px' }}>
                        Username cannot be changed
                      </p>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label htmlFor="display_name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Display Name:
                      </label>
                      <input 
                        id="display_name"
                        type="text" 
                        name="display_name" 
                        value={formData.display_name} 
                        onChange={handleChange} 
                        style={{ width: '100%' }}
                      />
                      <p style={{ fontSize: '10px', color: 'var(--win98-darker)', marginTop: '3px' }}>
                        This is how your name will appear to others
                      </p>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label htmlFor="bio" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Bio:
                      </label>
                      <textarea 
                        id="bio"
                        name="bio" 
                        value={formData.bio} 
                        onChange={handleChange} 
                        style={{ width: '100%', height: '100px', fontFamily: 'inherit' }}
                        placeholder="Tell others about yourself..."
                      />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label htmlFor="avatar_url" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Avatar URL:
                      </label>
                      <input 
                        id="avatar_url"
                        type="text" 
                        name="avatar_url" 
                        value={formData.avatar_url} 
                        onChange={handleChange} 
                        style={{ width: '100%' }}
                        placeholder="https://example.com/your-avatar.jpg"
                      />
                      <p style={{ fontSize: '10px', color: 'var(--win98-darker)', marginTop: '3px' }}>
                        Direct link to an image that will be used as your profile picture
                      </p>
                    </div>
                    
                    {formData.avatar_url && (
                      <div style={{ textAlign: 'center', marginTop: '10px', padding: '10px', border: '1px solid var(--win98-darker)' }}>
                        <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Avatar Preview</p>
                        <img 
                          src={formData.avatar_url} 
                          alt="Avatar Preview" 
                          style={{ 
                            maxWidth: '100px', 
                            maxHeight: '100px', 
                            border: '2px solid var(--win98-darker)',
                            padding: '2px',
                            backgroundColor: 'white'
                          }}
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="tab-content-98">
                <div className="window" style={{ margin: '10px 0', boxShadow: 'none', border: 'none' }}>
                  <div className="window-title">
                    <div className="title-text">
                      <span className="pixel-art" style={{ marginRight: '5px' }}>🔗</span>
                      Social Media Links
                    </div>
                  </div>
                  <div className="window-content" style={{ border: '1px solid var(--win98-darker)' }}>
                    <div style={{ marginBottom: '15px' }}>
                      <label htmlFor="twitter" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        <span className="pixel-art" style={{ marginRight: '5px' }}>🐦</span>
                        Twitter:
                      </label>
                      <input 
                        id="twitter"
                        type="text" 
                        name="twitter" 
                        value={socialLinks.twitter} 
                        onChange={handleSocialLinkChange} 
                        style={{ width: '100%' }}
                        placeholder="https://twitter.com/yourusername"
                      />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <label htmlFor="github" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        <span className="pixel-art" style={{ marginRight: '5px' }}>🐙</span>
                        GitHub:
                      </label>
                      <input 
                        id="github"
                        type="text" 
                        name="github" 
                        value={socialLinks.github} 
                        onChange={handleSocialLinkChange} 
                        style={{ width: '100%' }}
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <label htmlFor="website" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        <span className="pixel-art" style={{ marginRight: '5px' }}>🌐</span>
                        Website:
                      </label>
                      <input 
                        id="website"
                        type="text" 
                        name="website" 
                        value={socialLinks.website} 
                        onChange={handleSocialLinkChange} 
                        style={{ width: '100%' }}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>

                    <div style={{ backgroundColor: '#ffffcc', border: '1px solid #ffcc00', padding: '10px', margin: '10px 0' }}>
                      <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        <span className="pixel-art" style={{ marginRight: '5px' }}>💡</span>
                        Tip
                      </p>
                      <p style={{ fontSize: '11px' }}>
                        Adding your social links helps other BasedNet users discover more of your content across the web.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'custom' && (
              <div className="tab-content-98">
                <div className="window" style={{ margin: '10px 0', boxShadow: 'none', border: 'none' }}>
                  <div className="window-title">
                    <div className="title-text">
                      <span className="pixel-art" style={{ marginRight: '5px' }}>🎨</span>
                      Custom Code
                    </div>
                  </div>
                  <div className="window-content" style={{ border: '1px solid var(--win98-darker)' }}>
                    <div style={{ marginBottom: '15px' }}>
                      <label htmlFor="custom_css" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Custom CSS:
                      </label>
                      <textarea 
                        id="custom_css"
                        name="custom_css" 
                        value={formData.custom_css} 
                        onChange={handleChange} 
                        style={{ width: '100%', height: '120px', fontFamily: 'monospace', fontSize: '12px' }}
                        placeholder={`/* Your custom CSS here */
body { 
  background-color: #000080; 
}
.my-class {
  color: yellow;
}`}
                      />
                      <p style={{ fontSize: '10px', color: 'var(--win98-darker)', marginTop: '3px' }}>
                        Custom CSS will be applied to your personal website
                      </p>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label htmlFor="custom_html" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Custom HTML:
                      </label>
                      <textarea 
                        id="custom_html"
                        name="custom_html" 
                        value={formData.custom_html} 
                        onChange={handleChange} 
                        style={{ width: '100%', height: '120px', fontFamily: 'monospace', fontSize: '12px' }}
                        placeholder={`<!-- Your custom HTML here -->
<div class="my-section">
  <h1>Welcome to my site!</h1>
  <p>This is my custom content.</p>
</div>`}
                      />
                      <p style={{ fontSize: '10px', color: 'var(--win98-darker)', marginTop: '3px' }}>
                        Custom HTML that will be injected into your personal website
                      </p>
                    </div>

                    <div className="win98-error" style={{ backgroundColor: '#ffffcc', borderColor: '#ffcc00' }}>
                      <span className="pixel-art" style={{ fontSize: '24px' }}>⚠️</span>
                      <div>
                        <p><b>Warning</b></p>
                        <p>Custom code is an advanced feature. Incorrect code may cause display issues on your personal site.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', padding: '10px', borderTop: '1px solid var(--win98-darker)' }}>
              <button 
                type="button" 
                className="btn-98"
                onClick={() => router.push('/')}
              >
                Cancel
              </button>
              
              <button 
                type="submit" 
                className="btn-98" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-98" style={{ width: '10px', height: '10px', marginRight: '5px' }}></span>
                    Saving...
                  </>
                ) : (
                  <>Save Profile</>
                )}
              </button>
            </div>
          </form>
        </div>
        <div style={{ borderTop: '1px solid var(--win98-darker)', padding: '5px 10px', fontSize: '10px', color: 'var(--win98-darker)', display: 'flex', justifyContent: 'space-between' }}>
          <div>User Profile Editor v1.0</div>
          <div>
            {lastSaved ? `Last saved: ${lastSaved}` : 'Not saved yet'}
          </div>
        </div>
      </div>
    </div>
  );
}
