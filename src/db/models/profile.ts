import { Profile } from './types';
import pool from '../config';
import { QueryResult } from 'pg';

export class ProfileModel {
  static async create(userId: number, data: Partial<Profile>): Promise<Profile> {
    const fields = ['user_id', ...Object.keys(data)];
    const values = [userId, ...Object.values(data)];
    const placeholders = fields.map((_, i) => `$${i + 1}`).join(', ');
    
    const query = `
      INSERT INTO profiles (${fields.join(', ')})
      VALUES (${placeholders})
      RETURNING *
    `;
    
    const result: QueryResult<Profile> = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByUserId(userId: number): Promise<Profile | null> {
    const query = 'SELECT * FROM profiles WHERE user_id = $1';
    const result: QueryResult<Profile> = await pool.query(query, [userId]);
    return result.rows[0] || null;
  }

  static async update(userId: number, updates: Partial<Profile>): Promise<Profile | null> {
    const allowedUpdates = [
      'display_name',
      'bio',
      'avatar_url',
      'theme_preferences',
      'custom_css',
      'custom_html',
      'social_links'
    ];
    
    const updateFields = Object.keys(updates).filter(key => allowedUpdates.includes(key));
    if (updateFields.length === 0) return null;

    const setClause = updateFields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const values = updateFields.map(field => {
      const value = updates[field as keyof Profile];
      return ['theme_preferences', 'social_links'].includes(field) ? JSON.stringify(value) : value;
    });

    const query = `
      UPDATE profiles 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
      WHERE user_id = $1 
      RETURNING *
    `;

    const result: QueryResult<Profile> = await pool.query(query, [userId, ...values]);
    return result.rows[0] || null;
  }

  static async delete(userId: number): Promise<boolean> {
    const query = 'DELETE FROM profiles WHERE user_id = $1 RETURNING id';
    const result = await pool.query(query, [userId]);
    return result.rowCount > 0;
  }

  static async getTheme(userId: number): Promise<Record<string, any> | null> {
    const query = 'SELECT theme_preferences FROM profiles WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows[0]?.theme_preferences || null;
  }

  static async updateTheme(userId: number, theme: Record<string, any>): Promise<boolean> {
    const query = `
      UPDATE profiles 
      SET theme_preferences = $2, updated_at = CURRENT_TIMESTAMP 
      WHERE user_id = $1
    `;
    const result = await pool.query(query, [userId, JSON.stringify(theme)]);
    return result.rowCount > 0;
  }
}
