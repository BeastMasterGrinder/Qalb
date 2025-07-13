import { createClient } from "@/utils/supabase/server";
import { Blog } from "@/types/blogs";
import { cache } from "react";

export const getBlogs = cache(async (): Promise<Blog[]> => {
    const supabase = await createClient();
    
    try {
        const { data, error } = await supabase
            .schema('private')
            .from('blogs')
            .select('id, created_at, title, slug, coverImage')
            .order('id', { ascending: false })
            .limit(1000);
            
        if (error) {
            console.error('Error fetching blogs:', error);
            throw new Error(error.message);
        }
        
        return data as Blog[];
    } catch (error) {
        console.error('Exception fetching blogs:', error);
        throw error;
    }
});