import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';

export const siteUrl = 'https://eveandlace.com';

const seo: Record<Locale, { title: string; description: string; ogLocale: string }> = {
  en: {
    title: 'Eve & Lace | Curated Intimate Apparel',
    description: 'Browse a curated edit of lingerie, lace sets, bodysuits, robes, and intimate wardrobe pieces from Eve & Lace.',
    ogLocale: 'en_US'
  },
  zh: {
    title: 'Eve & Lace | 精选私密服饰',
    description: '浏览 Eve & Lace 精选的蕾丝套装、连体衣、睡袍与私密衣橱单品。',
    ogLocale: 'zh_CN'
  },
  es: {
    title: 'Eve & Lace | Lencería seleccionada',
    description: 'Descubre una selección de lencería, conjuntos de encaje, bodys y batas de Eve & Lace.',
    ogLocale: 'es_ES'
  },
  fr: {
    title: 'Eve & Lace | Lingerie sélectionnée',
    description: 'Découvrez une sélection Eve & Lace de lingerie, ensembles en dentelle, bodys et peignoirs.',
    ogLocale: 'fr_FR'
  },
  ar: {
    title: 'Eve & Lace | قطع حميمة مختارة',
    description: 'اكتشفي تشكيلة Eve & Lace من اللانجري وأطقم الدانتيل والبودي سوت والروب.',
    ogLocale: 'ar'
  }
};

export const localePaths: Record<Locale, string> = {
  en: '/',
  zh: '/zh',
  es: '/es',
  fr: '/fr',
  ar: '/ar'
};

export const languageAlternates = {
  en: `${siteUrl}/`,
  'zh-CN': `${siteUrl}/zh`,
  es: `${siteUrl}/es`,
  fr: `${siteUrl}/fr`,
  ar: `${siteUrl}/ar`,
  'x-default': `${siteUrl}/`
};

export function metadataFor(locale: Locale): Metadata {
  const copy = seo[locale];
  const canonical = new URL(localePaths[locale], siteUrl).toString();

  return {
    metadataBase: new URL(siteUrl),
    title: copy.title,
    description: copy.description,
    alternates: { canonical, languages: languageAlternates },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: 'Eve & Lace',
      title: copy.title,
      description: copy.description,
      locale: copy.ogLocale,
      images: [{ url: '/assets/eve-lace/hero.webp', width: 920, height: 345, alt: 'Eve & Lace editorial collection' }]
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
      images: ['/assets/eve-lace/hero.webp']
    },
    icons: {
      icon: [
        { url: '/favicon-20260601.ico', type: 'image/x-icon' },
        { url: '/favicon-20260601.png', type: 'image/png', sizes: '192x192' }
      ],
      shortcut: ['/favicon-20260601.ico'],
      apple: [{ url: '/favicon-20260601.png', type: 'image/png', sizes: '192x192' }]
    }
  };
}
