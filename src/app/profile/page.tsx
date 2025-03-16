'use client';

import React, { useState, FormEvent } from 'react';
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

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, router]);

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
            <span>Loading...</span>
          </div>
          <div className="window-content" style={{ textAlign: 'center', padding: '20px' }}>
            <div className="loading-98"></div>
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
          <span>User Profile</span>
          <span>×</span>
        </div>
        <div className="window-content">
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ 
                backgroundColor: '#ffdddd', 
                border: '1px solid #ff0000', 
                padding: '10px', 
                marginBottom: '15px' 
              }}>
                Error: {error}
              </div>
            )}
            
            {successMessage && (
              <div style={{ 
                backgroundColor: '#ddffdd', 
                border: '1px solid #00ff00', 
                padding: '10px', 
                marginBottom: '15px' 
              }}>
                {successMessage}
              </div>
            )}

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Username:
              </label>
              <input 
                type="text" 
                value={user?.username || ''} 
                disabled 
                className="input-98"
                style={{ width: '100%' }}
              />
              <small>Username cannot be changed</small>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Display Name:
              </label>
              <input 
                type="text" 
                name="display_name" 
                value={formData.display_name} 
                onChange={handleChange} 
                className="input-98"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Bio:
              </label>
              <textarea 
                name="bio" 
                value={formData.bio} 
                onChange={handleChange} 
                className="input-98"
                style={{ width: '100%', height: '100px' }}
              />
            </div>
