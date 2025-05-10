import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/blog',
        '/blog/*',
        '/about',
        '/donate'
      ],
      disallow: [
        '/api/*',
        '/journals/*',
        '/profile/*',
        '/private/*',
        '/*.json$',
        '/*.xml$'
      ]
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  }
} 