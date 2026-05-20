import { StorefrontClient } from '@/app/storefront-client';
import { getStorefrontData } from '@/lib/store-data';
import type { Locale } from '@/lib/i18n';

export async function StorefrontPage({ locale }: { locale: Locale }) {
  const store = await getStorefrontData();

  return <StorefrontClient initialStore={store} locale={locale} />;
}
