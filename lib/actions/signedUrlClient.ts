import { createClient } from "@/utils/supabase/client";

export async function getSignedURLClient(path : string): Promise<string> {
    const supabase = await createClient();

    const { data } = await supabase.storage.from('avatars').createSignedUrl(path, 3600)
        
        if (data) {
            return data.signedUrl;
        } else {
            return '';
        }
}