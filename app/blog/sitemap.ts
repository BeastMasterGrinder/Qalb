import type { MetadataRoute } from 'next'
import { getBlogs } from '@/lib/actions/getBlogs'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://www.${process.env.NEXT_PUBLIC_APP_URL}`
  : 'http://localhost:3000'

export async function generateSitemaps() {
  const blogs = await getBlogs();
  // Calculate how many sitemaps we need (50,000 URLs per sitemap is Google's limit)
  const pages = Math.ceil(blogs.length / 50000);
  
  return Array.from({ length: pages }, (_, index) => ({ id: index }));
}
 
export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const blogs = await getBlogs();
  
  const start = id * 50000;
  const end = start + 50000;
  
  // Slice the blogs array to get only the blogs for this sitemap
  const sitemapBlogs = blogs.slice(start, end);
  
  return sitemapBlogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.created_at,
    changeFrequency: 'weekly',
    priority: 0.7
  }))
}