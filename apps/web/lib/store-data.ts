export type StoreProduct = {
  id: string;
  title: string;
  category: 'Sets' | 'Bodysuits' | 'Robes' | 'Accessories';
  price: string;
  image: string;
  href: string;
  updatedAt: string;
};

export type StoreCategory = {
  id: 'sets' | 'bodysuits' | 'robes' | 'accessories';
  name: string;
  href: string;
  image: string;
  cta: string;
};

export type StorefrontData = {
  brand: string;
  storeTitle: string;
  sourceUrl: string;
  storeId: string;
  domain: string;
  lastRefreshed: string;
  products: StoreProduct[];
  categories: StoreCategory[];
  syncStatus?: {
    source: 'aliexpress' | 'feed' | 'fallback';
    message: string;
  };
};

export const sourceUrl = 'https://www.aliexpress.com/store/1105526094';

export const fallbackProducts: StoreProduct[] = [
  {
    id: 'lace-underwire-set',
    title: 'Lace Underwire Set',
    category: 'Sets',
    price: '$22.99',
    image: '/assets/eve-lace/product-lace-set.webp',
    href: sourceUrl,
    updatedAt: '2026-05-18T20:42:00+08:00'
  },
  {
    id: 'floral-embroidery-set',
    title: 'Floral Embroidery Set',
    category: 'Sets',
    price: '$24.99',
    image: '/assets/eve-lace/product-floral-set.webp',
    href: sourceUrl,
    updatedAt: '2026-05-18T20:42:00+08:00'
  },
  {
    id: 'lace-bodysuit',
    title: 'Lace Bodysuit',
    category: 'Bodysuits',
    price: '$19.99',
    image: '/assets/eve-lace/product-bodysuit.webp',
    href: sourceUrl,
    updatedAt: '2026-05-18T20:42:00+08:00'
  },
  {
    id: 'satin-lace-robe',
    title: 'Satin Lace Robe',
    category: 'Robes',
    price: '$26.99',
    image: '/assets/eve-lace/product-robe.webp',
    href: sourceUrl,
    updatedAt: '2026-05-18T20:42:00+08:00'
  },
  {
    id: 'strappy-teddy',
    title: 'Strappy Teddy',
    category: 'Bodysuits',
    price: '$18.99',
    image: '/assets/eve-lace/product-teddy.webp',
    href: sourceUrl,
    updatedAt: '2026-05-18T20:42:00+08:00'
  },
  {
    id: 'sheer-lace-set',
    title: 'Sheer Lace Set',
    category: 'Sets',
    price: '$21.99',
    image: '/assets/eve-lace/product-sheer-set.webp',
    href: sourceUrl,
    updatedAt: '2026-05-18T20:42:00+08:00'
  },
  {
    id: 'lingerie-accessory-set',
    title: 'Lingerie Accessory Set',
    category: 'Accessories',
    price: '$12.99',
    image: '/assets/eve-lace/product-accessory.webp',
    href: sourceUrl,
    updatedAt: '2026-05-18T20:42:00+08:00'
  }
];

export const fallbackData: StorefrontData = {
  brand: 'Eve & Lace',
  storeTitle: 'Eve & Lace Store - Amazing products with exclusive discounts on AliExpress',
  sourceUrl,
  storeId: '1105526094',
  domain: 'eveandlace.com',
  lastRefreshed: '2026-05-18T20:42:00+08:00',
  products: fallbackProducts,
  categories: [
    {
      id: 'sets',
      name: 'Lingerie Sets',
      href: sourceUrl,
      image: '/assets/eve-lace/product-lace-set.webp',
      cta: 'Shop Sets'
    },
    {
      id: 'bodysuits',
      name: 'Bodysuits',
      href: sourceUrl,
      image: '/assets/eve-lace/product-teddy.webp',
      cta: 'Shop Bodysuits'
    },
    {
      id: 'robes',
      name: 'Robes & Sleep',
      href: sourceUrl,
      image: '/assets/eve-lace/product-robe.webp',
      cta: 'Shop Robes'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      href: sourceUrl,
      image: '/assets/eve-lace/product-accessory.webp',
      cta: 'Shop Accessories'
    }
  ],
  syncStatus: {
    source: 'fallback',
    message: 'Using curated fallback data until a live marketplace sync succeeds.'
  }
};

export function isStorefrontData(value: unknown): value is StorefrontData {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<StorefrontData>;
  if (
    typeof candidate.brand !== 'string' ||
    typeof candidate.sourceUrl !== 'string' ||
    typeof candidate.lastRefreshed !== 'string' ||
    !isHttpUrl(candidate.sourceUrl) ||
    Number.isNaN(Date.parse(candidate.lastRefreshed)) ||
    !Array.isArray(candidate.products) ||
    candidate.products.length === 0 ||
    candidate.products.length > 100
  ) {
    return false;
  }

  return candidate.products.every((product) => {
    if (!product || typeof product !== 'object') return false;
    const item = product as Partial<StoreProduct>;
    return Boolean(
      typeof item.id === 'string' &&
      typeof item.title === 'string' &&
      typeof item.price === 'string' &&
      typeof item.image === 'string' &&
      typeof item.href === 'string' &&
      typeof item.updatedAt === 'string' &&
      item.id.length <= 160 &&
      item.title.length <= 200 &&
      isHttpUrl(item.href)
    );
  });
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export async function getStorefrontData(): Promise<StorefrontData> {
  const feedUrl = process.env.EVE_LACE_STORE_FEED_URL;

  if (!feedUrl) {
    return fallbackData;
  }

  try {
    const response = await fetch(feedUrl, {
      next: { revalidate: 60 * 60 },
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      return fallbackData;
    }

    const payload = (await response.json()) as unknown;
    return isStorefrontData(payload) ? payload : fallbackData;
  } catch {
    return fallbackData;
  }
}

export function formatRefreshTime(value: string, locale = 'en') {
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : locale === 'ar' ? 'ar' : locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Shanghai',
    timeZoneName: 'short'
  }).format(new Date(value));
}
