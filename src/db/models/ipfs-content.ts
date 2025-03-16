import { IpfsContent } from './types';
import pool from '../config';
import { QueryResult } from 'pg';

export class IpfsContentModel {
  static async create(
    userId: number,
    cid: string,
    contentType?: string,
    filename?: string,
    size?: number
  ): Promise<IpfsContent> {
    const query = `
      INSERT INTO ipfs_content (user_id, cid, content_type, filename, size)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    
    const result: QueryResult<IpfsContent> = await pool.query(query, [
      userId,
      cid,
      contentType,
      filename,
      size
    ]);
    return result.rows[0];
  }

  static async findByCid(cid: string): Promise<IpfsContent | null> {
    const query = 'SELECT * FROM ipfs_content WHERE cid = $1';
    const result: QueryResult<IpfsContent> = await pool.query(query, [cid]);
    return result.rows[0] || null;
  }

  static async findByUser(userId: number, limit = 10, offset = 0): Promise<IpfsContent[]> {
    const query = `
      SELECT * FROM ipfs_content 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT $2 OFFSET $3
    `;
    const result: QueryResult<IpfsContent> = await pool.query(query, [userId, limit, offset]);
    return result.rows;
  }

  static async setPinStatus(cid: string, pinned: boolean): Promise<IpfsContent | null> {
    const query = `
      UPDATE ipfs_content 
      SET pinned = $2 
      WHERE cid = $1 
      RETURNING *
    `;
    const result: QueryResult<IpfsContent> = await pool.query(query, [cid, pinned]);
    return result.rows[0] || null;
  }

  static async delete(cid: string, userId: number): Promise<boolean> {
    const query = 'DELETE FROM ipfs_content WHERE cid = $1 AND user_id = $2 RETURNING id';
    const result = await pool.query(query, [cid, userId]);
    return result.rowCount > 0;
  }

  static async getPinnedContent(limit = 100): Promise<IpfsContent[]> {
    const query = `
      SELECT * FROM ipfs_content 
      WHERE pinned = true 
      ORDER BY created_at DESC 
      LIMIT $1
    `;
    const result: QueryResult<IpfsContent> = await pool.query(query, [limit]);
    return result.rows;
  }

  static async getContentStats(userId: number): Promise<{ 
    total: number; 
    pinned: number; 
    totalSize: number; 
  }> {
    const query = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN pinned THEN 1 ELSE 0 END) as pinned,
        COALESCE(SUM(size), 0) as total_size
      FROM ipfs_content 
      WHERE user_id = $1
    `;
    const result = await pool.query(query, [userId]);
    return {
      total: parseInt(result.rows[0].total),
      pinned: parseInt(result.rows[0].pinned),
      totalSize: parseInt(result.rows[0].total_size)
    };
  }
}
