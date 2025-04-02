import { Database } from 'sqlite3';
import path from 'path';
import { cache } from 'react';

const dbPath = path.join(process.cwd(), 'quran-verses.db');

export interface QuranVerse {
    verse_key?: string;
    verse: string;
    sentiment: string;
    anger_percent?: number;
    fear_percent?: number;
    joy_percent?: number;
    sadness_percent?: number;
}

export interface SentimentVersesResponse {
    verses: QuranVerse[];
    error?: string;
}

/**
 * Get a specified number of random verses matching a sentiment
 */
export const getRandomVersesBySentiment = cache(async (
    sentiment: string,
    limit: number = 5
): Promise<SentimentVersesResponse> => {
    return new Promise((resolve) => {
        const db = new Database(dbPath, (err) => {
            if (err) {
                console.error('Database connection error:', err.message);
                resolve({ verses: [], error: "Failed to connect to database" });
                return;
            }
            
            const query = `
                SELECT 
                    verse_key,
                    verse_text AS verse,
                    sentiment,
                    anger_percent,
                    fear_percent,
                    joy_percent,
                    sadness_percent
                FROM segmented_verses 
                WHERE sentiment = ? 
                ORDER BY RANDOM() 
                LIMIT ?
            `;
            
            db.all(query, [sentiment, limit], (err, rows) => {
                if (err) {
                    console.error('Query error:', err.message);
                    resolve({ verses: [], error: "Failed to query database" });
                    return;
                }
                
                db.close((err) => {
                    if (err) {
                        console.error('Error closing database:', err.message);
                    }
                });
                
                resolve({ verses: rows as QuranVerse[] || [] });
            });
        });
    });
});
