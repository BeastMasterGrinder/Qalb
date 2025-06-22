"use server";

import { createClient } from "@/utils/supabase/server";
import { cache } from "react";
import { updateUserMetadata } from "./user";

export async function getPFPUrl(): Promise<string | Error>{
    try {
        
        const supabase = await createClient();
        // get the user id 
        const { data: { user } } = await supabase.auth.getUser();

        if (! user) {
            throw new Error("Unable to get the user id, when downloading the image");
        }

        let path = `${user.id}/${user.id}.jpeg`;
        const { data : exists } = await supabase.storage.from('avatars').exists(path)
        // console.log("data",data)


        if (exists === false) {
            path = `${user.id}/${user.id}.jpg`;
            const { data: exists } = await supabase.storage.from('avatars').exists(path)
            if (exists === false) {
                return ""
            }
        }
        const { data } = await supabase.storage.from('avatars').createSignedUrl(path, 3600)
        
        if (data) {
            return data.signedUrl;
        } else {
            throw new Error("Unable to get the signed url");
        }

    } catch (error) {
        return new Error(`${error}`)
    }
}

export async function updatePFPUrlProfiles(path: string): Promise<boolean | Error>{
    try {

        const supabase = await createClient();
        const { data: {user} } = await supabase.auth.getUser();
        if (!user) {
            throw new Error("Unable to get the user id, when updating the image");
        }


        const { data } = await supabase.from("profiles").update({
            avatar_url: path
        }).eq("id", user.id).select().single()


        if (data === null) {
            throw new Error("Unable to update the image");
        }

        // update the user metadata for caching and shit
        let res = await updateUserMetadata(user.id, path)
        if (res === false){
            throw new Error("Something went wrong with uploading the profile pic to user's metadata")
        }

        return true;
        
    } catch (error) {
        return new Error(`${error}`)
    }
}