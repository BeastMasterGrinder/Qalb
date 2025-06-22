import { Blog } from "@/types/blogs";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";


const  getBlogData = cache(  async(slug: string) => {
    const supabase = await createClient();
    
    try {
      const { data: blog, error } = await supabase
        .schema('private')
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) {
        console.error('Error fetching blog:', error);
        return null;
      }
      
      return blog as Blog;
    } catch (error) {
      console.error('Exception fetching blog:', error);
      return null;
    }
  });

export default getBlogData