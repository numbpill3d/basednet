export interface User {
  id: number;
  username: string;
  email?: string;
  auth_domain?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Profile {
  id: number;
  user_id: number;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  theme_preferences?: Record<string, any>;
  custom_css?: string;
  custom_html?: string;
  social_links?: Record<string, string>;
  created_at: Date;
  updated_at: Date;
}

export interface Webring {
  id: number;
  name: string;
  description?: string;
  creator_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface WebringMember {
  webring_id: number;
  user_id: number;
  joined_at: Date;
}

export interface IpfsContent {
  id: number;
  user_id: number;
  cid: string;
  content_type?: string;
  filename?: string;
  size?: number;
  pinned: boolean;
  created_at: Date;
}

export interface Activity {
  id: number;
  user_id: number;
  type: string;
  payload?: Record<string, any>;
  published_at: Date;
}
