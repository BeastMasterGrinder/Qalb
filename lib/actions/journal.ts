"use server";

import { createClient } from "@/utils/supabase/client";
import { cache } from "react";
import sqlite3 from "sqlite3";
import path from "path";
import { getBrowser } from "@/lib/browser/getbrowser";
const dbPath = path.join(process.cwd(), 'quran-verses.db');

/**
 * Get all journals
 * @returns {Promise<Array>} - A promise that resolves to an array of journals
 */
export const getAllJournals = cache(async () => {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase.from("journals").select("*");
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
        const supabase = await createClient();
        //check if the user is authenticated
        const { data: session } = await supabase.auth.getSession();
        if (!session) {
            const browserid = getBrowser();
            if (!browserid) {
                return { error: "No browser id found" };
            }
            // query local sqlite db
            const db = new sqlite3.Database(dbPath, (err: any) => {
                if (err) return console.error(err.message);
                console.log('Connected to Quran verses database');
            });
            await db.get("SELECT * FROM journals WHERE userId = ?", [browserid], (err: any, row: any) => {
                if (err) return console.error(err.message);
                console.log('Journal:', row);
                return row;
            });
        } else {
            const { data, error } = await supabase.from("journals").select("*").eq("id", id);
            return data;
        }
    } catch (error) {
        console.error(error);
        return { error: "Failed to get journal" };
    }
});
