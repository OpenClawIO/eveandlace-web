import type { MetadataRoute } from 'next';
import { languageAlternates, localePaths, siteUrl } from '@/lib/metadata';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(localePaths).map((path, index) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: 'daily',
    priority: index === 0 ? 1 : 0.9,
    alternates: { languages: languageAlternates }
  }));
}
