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
        const { data } = await supabase.storage.from('avatars').getPublicUrl(path)
        console.log("data",data)
        if (!data) {
            throw new Error("Something went wrong when getting the PFP")
        }
        const url = data.publicUrl
        return url
    } catch (error) {
        return new Error(`${error}`)
    }
}