"use server";

import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export async function getPFPUrl(): Promise<string | Error>{
    try {
        
        const supabase = await createClient();
        // get the user id 
        const { data: { user } } = await supabase.auth.getUser();

        if (! user) {
            throw new Error("Unable to get the user id, when downloading the image");
        }

        let path = `${user.id}.jpg`;
        const { data } = await supabase.storage.from('avatars').exists(path)
        console.log("data",data)


        if (data === false) {
            return ""
        }
        const { data: {publicUrl} } = await supabase.storage.from('avatars').getPublicUrl(path)
        return publicUrl
    } catch (error) {
        return new Error(`${error}`)
    }
}