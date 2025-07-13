import type { MetadataRoute } from 'next'
import { getBlogs } from '@/lib/actions/getBlogs'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://www.${process.env.NEXT_PUBLIC_APP_URL}`
  : 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get total number of blogs to determine how many sitemap files we need
  const blogs = await getBlogs();
  const totalSitemaps = Math.ceil(blogs.length / 50000);
  
  // Create sitemap entries for blog sitemap files
  const blogSitemapEntries = Array.from({ length: totalSitemaps }, (_, index) => ({
    url: `${baseUrl}/blog/sitemap.xml?id=${index}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/donate`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sign-in`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sign-up`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Add the blog sitemap entries
    ...blogSitemapEntries
  ]
}