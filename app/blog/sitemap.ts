import type { MetadataRoute } from 'next'
import { getBlogs } from '@/lib/actions/getBlogs'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://www.${process.env.NEXT_PUBLIC_APP_URL}`
  : 'http://localhost:3000'

// Remove generateSitemaps as we'll handle pagination differently
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const blogs = await getBlogs();
    
    return blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.created_at,
      changeFrequency: 'weekly',
      priority: 0.7
    }));
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    return [];
  }
}