import session from 'express-session';
import { db } from './db.js';

const upsertStmt = db.prepare(
  `INSERT INTO sessions (sid, data, expires_at) VALUES (?, ?, ?)
   ON CONFLICT(sid) DO UPDATE SET data = excluded.data, expires_at = excluded.expires_at`
);
const getStmt = db.prepare('SELECT data, expires_at FROM sessions WHERE sid = ?');
const destroyStmt = db.prepare('DELETE FROM sessions WHERE sid = ?');
const purgeExpiredStmt = db.prepare('DELETE FROM sessions WHERE expires_at < ?');

export class SqliteSessionStore extends session.Store {
  get(sid, callback) {
    try {
      purgeExpiredStmt.run(Date.now());
      const row = getStmt.get(sid);
      if (!row) return callback(null, null);
      callback(null, JSON.parse(row.data));
    } catch (err) {
      callback(err);
    }
  }

  set(sid, sessionData, callback) {
    try {
      const maxAgeMs = sessionData.cookie?.maxAge ?? 1000 * 60 * 60 * 24;
      const expiresAt = Date.now() + maxAgeMs;
      upsertStmt.run(sid, JSON.stringify(sessionData), expiresAt);
      callback?.(null);
    } catch (err) {
      callback?.(err);
    }
  }

  destroy(sid, callback) {
    try {
      destroyStmt.run(sid);
      callback?.(null);
    } catch (err) {
      callback?.(err);
    }
  }

  touch(sid, sessionData, callback) {
    this.set(sid, sessionData, callback);
  }
}
