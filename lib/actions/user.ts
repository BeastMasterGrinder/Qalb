"use server";

import { createClient } from "@/utils/supabase/client";

/**
 * Check if the user is logged in
 * @returns The id of the session user if they are logged in, null otherwise
 */
export async function checkUser(): Promise<string | null> {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    return userError || !user ? null : user.id;
}