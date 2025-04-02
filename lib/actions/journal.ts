"use server";

import { createClient } from "@/utils/supabase/server";
import { cache } from "react";
import sqlite3 from "sqlite3";
import path from "path";
import { formatJournalSentiments } from "@/lib/utils";
// import { getBrowser } from "@/lib/browser/getbrowser";
const dbPath = path.join(process.cwd(), 'quran-verses.db');

// Define types for sentiments
type SentimentItem = {
    en_verse_text: string;
    sentiments?: {
        anger: number;
        fear: number;
        joy: number;
        sadness: number;
    };
};

type Sentiments = {
    joy: SentimentItem[];
    anger: SentimentItem[];
    sadness: SentimentItem[];
    fear: SentimentItem[];
};

type JournalEntry = {
    id: string;
    createdAt: number;
    userId: string;
    sentiments: string;
    content: string;
    is_deleted: number;
};

type JournalSentimentEntry = {
    sentence: string;
    sentiment: string;
};

/**
 * Get all journals
 * @returns {Promise<Array>} - A promise that resolves to an array of journals
 */
export const getAllJournals = cache(async () => {
    try {
        const supabase = await createClient();

        const { data: user } = await supabase.auth.getUser();

        if (!user || user.user === null) {
            return { error: "User not found" };
        }

        const { data, error } = await supabase
            .from("Journals")
            .select("*")
            .eq("user_id", user.user.id);

        if (error) {
            console.error(error);
            return { error: "Failed to get journals" };
        }

        console.log("journals", data);
        return data;
    } catch (error) {
        console.error(error);
        return { error: "Failed to get journals" };
    }
});

/**
 * Get a journal by id
 * @param {string} id - The id of the journal
 * @returns {Promise<Object>} - A promise that resolves to a journal
 */
export const getJournal = cache(async (id: string) => {
    try {
        console.log("id", id);
        const supabase = await createClient();
        //check if the user is authenticated
        const { data: user } = await supabase.auth.getUser();
        console.log("user", user);
        
        if (!user || user.user === null) {
            // Query local sqlite db using a Promise
            return new Promise<JournalSentimentEntry[] | { error: string }>((resolve, reject) => {
                const db = new sqlite3.Database(dbPath, (err) => {
                    if (err) {
                        console.error(err.message);
                        return resolve({ error: "Failed to connect to database" });
                    }
                    console.log('Connected to Quran verses database');
                });
                
                db.get("SELECT * FROM journals WHERE id = ? and is_deleted = 0", [id], (err, row: JournalEntry) => {
                    if (err) {
                        console.error(err.message);
                        resolve({ error: "Failed to query journal" });
                    } else {
                        console.log('Journal:', row);
                        if (row && row.sentiments) {
                            try {
                                // Use the utility function to format the journal data
                                const formattedData = formatJournalSentiments([row]);
                                resolve(formattedData);
                            } catch (e) {
                                console.error("Error parsing sentiments:", e);
                                resolve({ error: "Failed to parse journal sentiments" });
                            }
                        } else {
                            resolve({ error: "Journal not found or has no sentiments" });
                        }
                    }
                    db.close();
                });
            });
        } else {
            console.log("user", user.user.id);
            const { data, error } = await supabase
                .from("Journals")
                .select("*")
                .eq("id", id)
                .eq("user_id", user.user.id);
            if (error) {
                console.error(error);
                return { error: "Failed to get journal from Supabase" };
            }
            
            // Use the utility function to format the journal data
            return formatJournalSentiments(data);
        }
    } catch (error) {
        console.error(error);
        return { error: "Failed to get journal" };
    }
});
