import { Database } from 'sqlite3';
import path from 'path';
import { cache } from 'react';

const dbPath = path.join(process.cwd(), 'quran-verses.db');

export interface QuranVerse {
    id?: string;
    verse_key?: string;
    verse_uthmani?: string;
    verse_text?: string;
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
                    sv.verse_key as id,
                    verses.verse_key as verse_key,
                    verses.text_uthmani AS verse_uthmani,
                    sv.verse_text AS verse_text,
                    sv.sentiment,
                    sv.anger_percent,
                    sv.fear_percent,
                    sv.joy_percent,
                    sv.sadness_percent
                FROM segmented_verses sv JOIN verses ON sv.verse_key = verses.id
                WHERE sv.sentiment = ? 
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
