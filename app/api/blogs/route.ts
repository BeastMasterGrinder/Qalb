import { createClient } from "@/utils/supabase/server";
import { NextResponse } from 'next/server';
import { revalidatePath } from "next/cache";

// Types
interface BlogRequest {
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  author?: string;
}

/**
 * Create a blog post
 * @param {Request} request - The request object containing blog data
 * @returns {Promise<NextResponse>} - JSON response with status
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    
    // Check if authorization header exists and has the correct format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        error: "Unauthorized: Invalid authorization header"
      }, { status: 401 });
    }
    
    // Extract the token
    const token = authHeader.split(' ')[1];
    
    // Verify the token (you should replace this with your actual API token)
    const apiToken = process.env.BLOG_API_TOKEN;
    if (!apiToken || token !== apiToken) {
      return NextResponse.json({
        error: "Unauthorized: Invalid token"
      }, { status: 401 });
    }
    
    // Parse the request body
    const { title, content, slug, excerpt, author } = await request.json() as BlogRequest;
    
    // Validate required fields
    if (!title || !content || !slug) {
      return NextResponse.json({
        error: "Title, content, and slug are required"
      }, { status: 400 });
    }
    
    // Check for slug uniqueness
    const supabase = await createClient();
    const { data: existingBlog } = await supabase.schema('private')
      .from('blogs')
      .select('slug')
      .eq('slug', slug)
      .single();
    
    if (existingBlog) {
      return NextResponse.json({
        error: "A blog with this slug already exists"
      }, { status: 409 });
    }
    
    // Insert the blog post
    const { error: insertError } = await supabase
      .schema('private')
      .from('blogs')
      .insert({
        title,
        content,
        slug,
        excerpt: excerpt || content.substring(0, 150) + '...',
        author,
        created_at: new Date().toISOString()
      });
    
    if (insertError) {
      console.error("Supabase insert error:", insertError);
      throw new Error(insertError.message);
    }
    
    // Revalidate blog pages
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    
    return NextResponse.json({
      success: true,
      message: "Blog post created successfully",
      slug
    }, { status: 201 });
  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json({
      error: "Failed to process blog creation request"
    }, { status: 500 });
  }
}

/**
 * Update a blog post
 * @param {Request} request - The request object containing updated blog data
 * @returns {Promise<NextResponse>} - JSON response with status
 */
export async function PUT(request: Request): Promise<NextResponse> {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    
    // Check if authorization header exists and has the correct format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        error: "Unauthorized: Invalid authorization header"
      }, { status: 401 });
    }
    
    // Extract the token
    const token = authHeader.split(' ')[1];
    
    // Verify the token
    const apiToken = process.env.BLOG_API_TOKEN;
    if (!apiToken || token !== apiToken) {
      return NextResponse.json({
        error: "Unauthorized: Invalid token"
      }, { status: 401 });
    }
    
    // Parse the request body
    const { title, content, slug, excerpt, author } = await request.json() as BlogRequest;
    
    // Validate required fields
    if (!slug) {
      return NextResponse.json({
        error: "Slug is required for updating a blog post"
      }, { status: 400 });
    }
    
    // Check if blog exists
    const supabase = await createClient();
    const { data: existingBlog } = await supabase
      .schema('private')
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (!existingBlog) {
      return NextResponse.json({
        error: "Blog post not found"
      }, { status: 404 });
    }
    
    // Prepare update data
    const updateData: Partial<BlogRequest> & { updated_at?: string } = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (excerpt) updateData.excerpt = excerpt;
    if (author) updateData.author = author;
    updateData.updated_at = new Date().toISOString();
    
    // Update the blog post
    const { error: updateError } = await supabase
      .from('blogs')
      .update(updateData)
      .eq('slug', slug);
    
    if (updateError) {
      console.error("Supabase update error:", updateError);
      throw new Error(updateError.message);
    }
    
    // Revalidate blog pages
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    
    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully",
      slug
    }, { status: 200 });
  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json({
      error: "Failed to process blog update request"
    }, { status: 500 });
  }
} 