import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EMEA HSS Special Care Center',
    short_name: 'EMEA HSS',
    description: 'Dedicated to providing specialized care and education for children.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#55CF9A',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}
