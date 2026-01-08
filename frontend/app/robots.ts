import {MetadataRoute} from 'next'
import {headers} from 'next/headers'

/**
 * This file creates a robots.txt file for the application.
 * Learn more about robots.txt in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers()
  const domain = headersList.get('host') || 'localhost:3000'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${protocol}://${domain}/sitemap.xml`,
  }
}
