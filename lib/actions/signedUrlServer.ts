import { createClient } from "@/utils/supabase/server";


export async function getSignedURLServer(path : string): Promise<string> {
    const supabase = await createClient();

    const { data } = await supabase.storage.from('avatars').createSignedUrl(path, 3600)
        
        if (data) {
            return data.signedUrl;
        } else {
            return '';
        }
}