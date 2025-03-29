"use server";

import { createClient } from "@/utils/supabase/server";

/**
 * Check if the user is logged in
 * @returns The id of the session user if they are logged in, null otherwise
 */
export async function checkUser(): Promise<string | null> {
    try {
        const supabase = await createClient();
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        
        if (userError) {
            console.error("Error in checkUser:", userError);
            return null;
        }
        
        return user ? user.id : null;
    } catch (err) {
        console.error("Exception in checkUser function:", err);
        return null;
    }
}