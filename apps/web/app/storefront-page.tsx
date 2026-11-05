import { StorefrontClient } from '@/app/storefront-client';
import { getStorefrontData } from '@/lib/store-data';
import type { Locale } from '@/lib/i18n';

export async function StorefrontPage({ locale }: { locale: Locale }) {
  const store = await getStorefrontData();
  const productsWithDirectLinks = store.products.filter((product) => product.href !== store.sourceUrl);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://eveandlace.com/#organization',
        name: store.brand,
        url: 'https://eveandlace.com/',
        logo: 'https://eveandlace.com/assets/eve-lace/logo-mark-20260601.webp'
      },
      {
        '@type': 'WebSite',
        '@id': 'https://eveandlace.com/#website',
        name: store.brand,
        url: 'https://eveandlace.com/',
        publisher: { '@id': 'https://eveandlace.com/#organization' }
      },
      ...(productsWithDirectLinks.length
        ? [
            {
              '@type': 'ItemList',
              itemListElement: productsWithDirectLinks.map((product, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: { '@type': 'Product', name: product.title, image: product.image, url: product.href }
              }))
            }
          ]
        : [])
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <StorefrontClient initialStore={store} locale={locale} />
    </>
  );
}
