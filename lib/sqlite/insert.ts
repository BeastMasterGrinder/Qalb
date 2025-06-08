import { Database as SqliteDatabase } from 'sqlite3';
import { DatabaseError } from './interfaces';

export default async function insertLocalJournal(
    db: SqliteDatabase,
    params: [string, Date, string, string, string]
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO journals (id, createdAt, userId, sentiments, content) VALUES (?, ?, ?, ?, ?)",
        params,
        (err: DatabaseError | null) => {
          if (err) {
            console.error('SQLite insert error:', err);
            reject(err);
            return;
          }
          resolve();
        }
      );
    });
  };