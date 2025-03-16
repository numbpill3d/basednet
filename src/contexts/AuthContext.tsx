'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { api } from '../lib/api';

// Define types for our context
interface User {
  id: number;
  username: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

interface Profile {
  id: number;
  user_id: number;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  theme_preferences?: Record<string, any>;
  custom_css?: string;
  custom_html?: string;
  social_links?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch user data
  const fetchUserData = async () => {
    if (!session?.user) {
      setUser(null);
      setProfile(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Fetch user data
      const userResponse = await api.user.getCurrentUser();
      if (userResponse.error) {
        throw new Error(userResponse.error);
      }
      setUser(userResponse.data?.user || null);

      // Fetch profile data
      const profileResponse = await api.profile.getProfile();
      if (profileResponse.error) {
        throw new Error(profileResponse.error);
      }
      setProfile(profileResponse.data?.profile || null);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user data when session changes
  useEffect(() => {
    if (status === 'loading') {
      return;
    }
    
    fetchUserData();
  }, [session, status]);

  // Login function
  const login = async () => {
    try {
      await signIn('indieauth', { callbackUrl: '/' });
    } catch (err) {
      console.error('Login error:', err);
      setError((err as Error).message);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut({ callbackUrl: '/' });
      setUser(null);
      setProfile(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError((err as Error).message);
    }
  };

  // Function to manually refresh user data
  const refreshUserData = async () => {
    await fetchUserData();
  };

  // Context value
  const value = {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    error,
    login,
    logout,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
