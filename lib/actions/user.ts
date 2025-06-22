"use server";

import { AuthClientServer } from "@/utils/supabase/auth";
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

export async function updateUserMetadata(id: string, path: string): Promise<boolean> {
    try{

        const  supabase = await AuthClientServer();
        if (!supabase){
            return false;
        }

        const { data: user, error } = await supabase.updateUserById(
            id,
            { user_metadata: { avatar_url: path } }
            )

        if (!user){
            console.log("Something went wrong with updateing user metadata", error?.message)
            return false
        }

        return true;
    } catch {
        return false;
    }
}