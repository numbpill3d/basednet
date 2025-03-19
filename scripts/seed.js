const { Pool } = require('pg');

// Load environment variables
require('dotenv').config();

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function seed() {
  try {
    console.log('Starting database seeding...');
    
    // Connect to the database
    const client = await pool.connect();
    
    try {
      // Begin transaction
      await client.query('BEGIN');
      
      // Create admin user
      const adminResult = await client.query(
        `INSERT INTO users (username, email, auth_domain, created_at, updated_at)
         VALUES ('admin', 'admin@basednet.com', 'https://admin.basednet.com', NOW(), NOW())
         RETURNING id`
      );
      
      const adminId = adminResult.rows[0].id;
      
      // Create admin profile
      await client.query(
        `INSERT INTO profiles (
          user_id, 
          display_name, 
          bio, 
          avatar_url, 
          theme_preferences, 
          social_links, 
          created_at, 
          updated_at
        )
        VALUES (
          $1, 
          'BasedNet Admin', 
          'Official BasedNet administrator account', 
          'https://ipfs.io/ipfs/QmYGgEFqTRkBUjm1qjhLpmYGsYwkQKhYUgYgXxRJ3GaNqL', 
          '{"theme": "win98", "colorScheme": "dark"}', 
          '{"twitter": "https://twitter.com/basednet", "github": "https://github.com/basednet"}',
          NOW(), 
          NOW()
        )`,
        [adminId]
      );
      
      // Create demo webrings
      const webrings = [
        { name: 'Retro Computing', description: 'Websites about vintage computers and software' },
        { name: 'Digital Art', description: 'Creative digital art and pixel art websites' },
        { name: 'Indie Game Dev', description: 'Independent game developers and their projects' },
        { name: 'Web 1.0 Revival', description: 'Websites celebrating the early web aesthetic' }
      ];
      
      for (const webring of webrings) {
        await client.query(
          `INSERT INTO webrings (name, description, creator_id, created_at, updated_at)
           VALUES ($1, $2, $3, NOW(), NOW())`,
          [webring.name, webring.description, adminId]
        );
      }
      
      // Create demo users
      const demoUsers = [
        { username: 'pixelartist', email: 'pixel@example.com', domain: 'https://pixel.example.com' },
        { username: 'retrodev', email: 'retro@example.com', domain: 'https://retro.example.com' },
        { username: 'webmaster', email: 'webmaster@example.com', domain: 'https://webmaster.example.com' }
      ];
      
      for (const user of demoUsers) {
        const userResult = await client.query(
          `INSERT INTO users (username, email, auth_domain, created_at, updated_at)
           VALUES ($1, $2, $3, NOW(), NOW())
           RETURNING id`,
          [user.username, user.email, user.domain]
        );
        
        const userId = userResult.rows[0].id;
        
        // Create profile for demo user
        await client.query(
          `INSERT INTO profiles (
            user_id, 
            display_name, 
            bio, 
            created_at, 
            updated_at
          )
          VALUES (
            $1, 
            $2, 
            $3, 
            NOW(), 
            NOW()
          )`,
          [userId, user.username, `This is a demo account for ${user.username}`]
        );
      }
      
      // Commit transaction
      await client.query('COMMIT');
      console.log('Seed data inserted successfully!');
    } catch (error) {
      // Rollback transaction on error
      await client.query('ROLLBACK');
      throw error;
    } finally {
      // Release the client back to the pool
      client.release();
    }
    
    // Close the pool
    await pool.end();
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

// Run the seed function
seed();
