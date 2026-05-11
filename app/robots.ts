import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Assuming there might be an admin route
    },
    sitemap: 'https://emeahss.edu.in/sitemap.xml',
  }
}
