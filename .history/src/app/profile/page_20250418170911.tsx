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

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, router]);

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
      await refreshUserData();
    } catch (err) {
      setError((err as Error).message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="nekoweb-container">
        <Navigation />
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className="nekoweb-container">
      <Navigation />
      
      {error && (
        <div style={{ backgroundColor: '#ffdddd', border: '1px solid #ff0000', padding: '10px', marginBottom: '15px' }}>
          Error: {error}
        </div>
      )}
      
      {successMessage && (
        <div style={{ backgroundColor: '#ddffdd', border: '1px solid #00ff00', padding: '10px', marginBottom: '15px' }}>
          {successMessage}
        </div>
      )}
      
      <h2>Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="display_name">Display Name:</label>
          <input 
            type="text" 
            id="display_name" 
            name="display_name" 
            value={formData.display_name} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea 
            id="bio" 
            name="bio" 
            value={formData.bio} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="avatar_url">Avatar URL:</label>
          <input 
            type="text" 
            id="avatar_url" 
            name="avatar_url" 
            value={formData.avatar_url} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="custom_css">Custom CSS:</label>
          <textarea 
            id="custom_css" 
            name="custom_css" 
            value={formData.custom_css} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="custom_html">Custom HTML:</label>
          <textarea 
            id="custom_html" 
            name="custom_html" 
            value={formData.custom_html} 
            onChange={handleChange} 
          />
        </div>
        <button type="submit" className="nekoweb-button" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}
