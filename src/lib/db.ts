import { Pool, QueryResult, PoolClient } from 'pg';

// Define types for our database entities
interface User {
  id: number;
  username: string;
  email?: string;
  auth_domain: string;
  created_at: Date;
  updated_at: Date;
}

interface Profile {
  id: number;
  user_id: number;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  theme_preferences?: Record<string, unknown>;
  custom_css?: string;
  custom_html?: string;
  social_links?: Record<string, string>;
  created_at: Date;
  updated_at: Date;
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test the connection on startup
pool.query('SELECT NOW()', (err: Error | null) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Database connected successfully');
  }
});

// Helper functions for common database operations
export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const start = Date.now();
  try {
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (err) {
    const error = err as Error;
    console.error('Query error:', error.message);
    throw error;
  }
}

export async function getUser(username: string): Promise<User | null> {
  const result = await query<User>(
    'SELECT * FROM users WHERE username = $1',
    [username]
  );
  return result.rows[0] || null;
}

export async function createUser(
  username: string,
  authDomain: string
): Promise<User> {
  const result = await query<User>(
    'INSERT INTO users (username, auth_domain) VALUES ($1, $2) RETURNING *',
    [username, authDomain]
  );
  return result.rows[0];
}

export async function getProfile(userId: number): Promise<Profile | null> {
  const result = await query<Profile>(
    'SELECT * FROM profiles WHERE user_id = $1',
    [userId]
  );
  return result.rows[0] || null;
}

export async function updateProfile(
  userId: number,
  profileData: Partial<Profile>
): Promise<Profile> {
  const result = await query<Profile>(
    `UPDATE profiles 
     SET display_name = $2,
         bio = $3,
         avatar_url = $4,
         theme_preferences = $5,
         custom_css = $6,
         custom_html = $7,
         social_links = $8,
         updated_at = CURRENT_TIMESTAMP
     WHERE user_id = $1
     RETURNING *`,
    [
      userId,
      profileData.display_name,
      profileData.bio,
      profileData.avatar_url,
      profileData.theme_preferences,
      profileData.custom_css,
      profileData.custom_html,
      profileData.social_links,
    ]
  );
  return result.rows[0];
}

// Transaction helper
export async function withTransaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

// Cleanup on application shutdown
process.on('SIGTERM', async () => {
  console.log('Closing database pool');
  await pool.end();
});

export default pool;