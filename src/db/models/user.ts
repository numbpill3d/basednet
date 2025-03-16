import { User } from './types';
import pool from '../config';
import { QueryResult } from 'pg';

export class UserModel {
  static async create(username: string, email?: string, authDomain?: string): Promise<User> {
    const query = `
      INSERT INTO users (username, email, auth_domain)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    const result: QueryResult<User> = await pool.query(query, [username, email, authDomain]);
    return result.rows[0];
  }

  static async findById(id: number): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result: QueryResult<User> = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async findByUsername(username: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result: QueryResult<User> = await pool.query(query, [username]);
    return result.rows[0] || null;
  }

  static async update(id: number, updates: Partial<User>): Promise<User | null> {
    const allowedUpdates = ['username', 'email', 'auth_domain'];
    const updateFields = Object.keys(updates).filter(key => allowedUpdates.includes(key));
    
    if (updateFields.length === 0) return null;

    const setClause = updateFields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const values = updateFields.map(field => updates[field as keyof User]);

    const query = `
      UPDATE users 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;

    const result: QueryResult<User> = await pool.query(query, [id, ...values]);
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }

  static async list(limit: number = 10, offset: number = 0): Promise<User[]> {
    const query = 'SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2';
    const result: QueryResult<User> = await pool.query(query, [limit, offset]);
    return result.rows;
  }
}
