import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    ? `https://www.${process.env.NEXT_PUBLIC_APP_URL}`
    : 'http://localhost:3000'

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/sitemap.xml', '/blog/sitemap.xml'],
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/journals/',
          '/profile/',
          '/private/',
          '/*.json',
        ]
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  }
} 