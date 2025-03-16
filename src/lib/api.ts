/**
 * API client utility for making requests to the backend
 */

// Define types for API responses
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Define types for pagination
export interface PaginationParams {
  limit?: number;
  offset?: number;
}

// Define error class for API errors
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

/**
 * Base fetch function with error handling
 */
async function fetchApi<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.error || 'An error occurred', response.status);
    }

    return { data: data as T };
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message };
    }
    return { error: (error as Error).message };
  }
}

/**
 * API client for user-related endpoints
 */
export const userApi = {
  /**
   * Get the current logged-in user
   */
  getCurrentUser: async () => {
    return fetchApi<{ user: any }>('/api/users?me=true');
  },

  /**
   * Get a user by username
   */
  getUserByUsername: async (username: string) => {
    return fetchApi<{ user: any; profile: any }>(`/api/users/${username}`);
  },

  /**
   * Update the current user
   */
  updateUser: async (data: { username?: string; email?: string }) => {
    return fetchApi<{ user: any }>('/api/users', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * List users with pagination
   */
  listUsers: async ({ limit = 10, offset = 0 }: PaginationParams = {}) => {
    return fetchApi<{ users: any[] }>(
      `/api/users?limit=${limit}&offset=${offset}`
    );
  },
};

/**
 * API client for profile-related endpoints
 */
export const profileApi = {
  /**
   * Get the current user's profile
   */
  getProfile: async () => {
    return fetchApi<{ profile: any }>('/api/profile');
  },

  /**
   * Update the current user's profile
   */
  updateProfile: async (data: {
    display_name?: string;
    bio?: string;
    avatar_url?: string;
    theme_preferences?: Record<string, any>;
    custom_css?: string;
    custom_html?: string;
    social_links?: Record<string, string>;
  }) => {
    return fetchApi<{ profile: any }>('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

/**
 * API client for IPFS content-related endpoints
 */
export const ipfsApi = {
  /**
   * Get IPFS content for the current user
   */
  getContent: async ({ limit = 10, offset = 0 }: PaginationParams = {}) => {
    return fetchApi<{ content: any[]; stats: any }>(
      `/api/ipfs?limit=${limit}&offset=${offset}`
    );
  },

  /**
   * Get a specific IPFS content item by CID
   */
  getContentByCid: async (cid: string) => {
    return fetchApi<{ content: any }>(`/api/ipfs/${cid}`);
  },

  /**
   * Create a new IPFS content item
   */
  createContent: async (data: {
    cid: string;
    contentType?: string;
    filename?: string;
    size?: number;
  }) => {
    return fetchApi<{ content: any }>('/api/ipfs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update pin status for an IPFS content item
   */
  updatePinStatus: async (cid: string, pinned: boolean) => {
    return fetchApi<{ content: any }>(`/api/ipfs/${cid}`, {
      method: 'PATCH',
      body: JSON.stringify({ pinned }),
    });
  },

  /**
   * Delete an IPFS content item
   */
  deleteContent: async (cid: string) => {
    return fetchApi<{ success: boolean }>(`/api/ipfs/${cid}`, {
      method: 'DELETE',
    });
  },
};

// Export a combined API object
export const api = {
  user: userApi,
  profile: profileApi,
  ipfs: ipfsApi,
};

export default api;
