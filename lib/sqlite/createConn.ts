import { Database as SqliteDatabase } from 'sqlite3';
import path from 'path';
import { DatabaseError } from './interfaces';

// Constants
const SQLITE_DB_PATH = path.join(process.cwd(), 'quran-verses.db');
const sqlite3 = require('sqlite3').verbose();

/**
 * Create a SQLite connection
 * @returns {Promise<SqliteDatabase>} - A promise that resolves to a SQLite database
 */
export default async function createSqliteConnection(): Promise<SqliteDatabase> {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(SQLITE_DB_PATH, (err: DatabaseError | null) => {
        if (err) {
          console.error('SQLite connection error:', err);
          reject(err);
          return;
        }
        resolve(db);
      });
    });
  };