import { Webring, WebringMember } from './types';
import pool from '../config';
import { QueryResult, QueryResultRow } from 'pg';

export class WebringModel {
  static async create(
    name: string,
    description: string,
    creatorId: number
  ): Promise<Webring> {
    const query = `
      INSERT INTO webrings (name, description, creator_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const result: QueryResult<Webring> = await pool.query(query, [
      name,
      description,
      creatorId
    ]);
    return result.rows[0];
  }

  static async findById(id: number): Promise<Webring | null> {
    const query = 'SELECT * FROM webrings WHERE id = $1';
    const result: QueryResult<Webring> = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async list(limit = 50, offset = 0): Promise<Webring[]> {
    const query = `
      SELECT w.*, COUNT(wm.user_id) as member_count
      FROM webrings w
      LEFT JOIN webring_members wm ON w.id = wm.webring_id
      GROUP BY w.id
      ORDER BY w.created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const result: QueryResult<Webring> = await pool.query(query, [limit, offset]);
    return result.rows;
  }

  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM webrings WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }

  static async addMember(webringId: number, userId: number): Promise<WebringMember> {
    const query = `
      INSERT INTO webring_members (webring_id, user_id)
      VALUES ($1, $2)
      RETURNING *
    `;

    const result: QueryResult<WebringMember> = await pool.query(query, [
      webringId,
      userId
    ]);
    return result.rows[0];
  }

  static async removeMember(webringId: number, userId: number): Promise<boolean> {
    const query = 'DELETE FROM webring_members WHERE webring_id = $1 AND user_id = $2 RETURNING user_id';
    const result = await pool.query(query, [webringId, userId]);
    return (result.rowCount ?? 0) > 0;
  }

  static async getMembers(webringId: number): Promise<WebringMember[]> {
    const query = `
      SELECT wm.*, u.username, p.display_name, p.avatar_url
      FROM webring_members wm
      JOIN users u ON wm.user_id = u.id
      LEFT JOIN profiles p ON u.id = p.user_id
      WHERE wm.webring_id = $1
      ORDER BY wm.joined_at DESC
    `;
    const result = await pool.query(query, [webringId]);
    return result.rows;
  }

  static async getUserWebrings(userId: number): Promise<Webring[]> {
    const query = `
      SELECT w.*
      FROM webrings w
      JOIN webring_members wm ON w.id = wm.webring_id
      WHERE wm.user_id = $1
      ORDER BY wm.joined_at DESC
    `;
    const result: QueryResult<Webring> = await pool.query(query, [userId]);
    return result.rows;
  }

  static async isMember(webringId: number, userId: number): Promise<boolean> {
    const query = 'SELECT 1 FROM webring_members WHERE webring_id = $1 AND user_id = $2';
    const result = await pool.query(query, [webringId, userId]);
    return result.rows.length > 0;
  }

  static async getNextMember(webringId: number, currentUserId: number): Promise<number | null> {
    const query = `
      WITH members AS (
        SELECT user_id, ROW_NUMBER() OVER (ORDER BY joined_at) as rn
        FROM webring_members
        WHERE webring_id = $1
      )
      SELECT user_id
      FROM members
      WHERE rn = (
        SELECT CASE
          WHEN rn = (SELECT MAX(rn) FROM members) THEN 1
          ELSE rn + 1
        END
        FROM members
        WHERE user_id = $2
      )
    `;
    const result = await pool.query(query, [webringId, currentUserId]);
    return result.rows[0]?.user_id || null;
  }

  static async getPreviousMember(webringId: number, currentUserId: number): Promise<number | null> {
    const query = `
      WITH members AS (
        SELECT user_id, ROW_NUMBER() OVER (ORDER BY joined_at) as rn
        FROM webring_members
        WHERE webring_id = $1
      )
      SELECT user_id
      FROM members
      WHERE rn = (
        SELECT CASE
          WHEN rn = 1 THEN (SELECT MAX(rn) FROM members)
          ELSE rn - 1
        END
        FROM members
        WHERE user_id = $2
      )
    `;
    const result = await pool.query(query, [webringId, currentUserId]);
    return result.rows[0]?.user_id || null;
  }

  static async getRandomMember(webringId: number, excludeUserId?: number): Promise<number | null> {
    const query = `
      SELECT user_id
      FROM webring_members
      WHERE webring_id = $1 ${excludeUserId ? 'AND user_id != $2' : ''}
      ORDER BY RANDOM()
      LIMIT 1
    `;
    const params = excludeUserId ? [webringId, excludeUserId] : [webringId];
    const result = await pool.query(query, params);
    return result.rows[0]?.user_id || null;
  }
}
