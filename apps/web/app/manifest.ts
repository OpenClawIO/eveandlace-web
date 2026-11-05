import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Eve & Lace',
    short_name: 'Eve & Lace',
    description: 'Curated intimate apparel from Eve & Lace.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#9d1027',
    icons: [{ src: '/favicon-20260601.png', sizes: '192x192', type: 'image/png' }]
  };
}
