
    const { Pool } = require('pg');
    require('dotenv').config();
    
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });
    
    async function testConnection() {
      try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        client.release();
        console.log('✅ Database connection successful');
        return true;
      } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        return false;
      } finally {
        await pool.end();
      }
    }
    
    testConnection();
    