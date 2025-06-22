import BlogGrid from "./BlogGrid";
import { createClient } from "@/utils/supabase/server";


export default async function BlogList() {
  const supabase = await createClient();
  
  const { data: blogs, error } = await supabase
    .schema('private')
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching blogs:', error);
    return <div className="text-red-500">Failed to load blogs</div>;
  }
  
  if (blogs.length === 0) {
    return (
      <div className="text-center py-16 max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4">No blogs published yet</h3>
        <p className="text-muted-foreground mb-6">
          Check back soon for new content or subscribe to receive updates.
        </p>
      </div>
    );
  }
  
  return (
    <BlogGrid blogs={blogs} />
  );
}