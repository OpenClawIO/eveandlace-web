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
};

const sourceUrl = 'https://www.aliexpress.com/store/1105526094';

const fallbackProducts: StoreProduct[] = [
  {
    id: 'lace-underwire-set',
    title: 'Lace Underwire Set',
    category: 'Sets',
    price: '$22.99',
    image: '/assets/eve-lace/product-lace-set.png',
    href: sourceUrl,
    updatedAt: '2026-05-18T20:42:00+08:00'
  },
  {
    id: 'floral-embroidery-set',
    title: 'Floral Embroidery Set',
    category: 'Sets',
    price: '$24.99',
    image: '/assets/eve-lace/product-floral-set.png',
    href: sourceUrl,
    updatedAt: '2026-05-18T20:42:00+08:00'
  },
  {
    id: 'lace-bodysuit',
    title: 'Lace Bodysuit',
    category: 'Bodysuits',
    price: '$19.99',
    image: '/assets/eve-lace/product-bodysuit.png',
    href: sourceUrl,
    updatedAt: '2026-05-18T20:42:00+08:00'
  },
  {
    id: 'satin-lace-robe',
    title: 'Satin Lace Robe',
    category: 'Robes',
    price: '$26.99',
    image: '/assets/eve-lace/product-robe.png',
    href: sourceUrl,
    updatedAt: '2026-05-18T20:42:00+08:00'
  },
  {
    id: 'strappy-teddy',
    title: 'Strappy Teddy',
    category: 'Bodysuits',
    price: '$18.99',
    image: '/assets/eve-lace/product-teddy.png',
    href: sourceUrl,
    updatedAt: '2026-05-18T20:42:00+08:00'
  },
  {
    id: 'sheer-lace-set',
    title: 'Sheer Lace Set',
    category: 'Sets',
    price: '$21.99',
    image: '/assets/eve-lace/product-sheer-set.png',
    href: sourceUrl,
    updatedAt: '2026-05-18T20:42:00+08:00'
  },
  {
    id: 'lingerie-accessory-set',
    title: 'Lingerie Accessory Set',
    category: 'Accessories',
    price: '$12.99',
    image: '/assets/eve-lace/product-accessory.png',
    href: sourceUrl,
    updatedAt: '2026-05-18T20:42:00+08:00'
  }
];

const fallbackData: StorefrontData = {
  brand: 'Eve & Lace',
  storeTitle: 'Eve & Lace Store - Amazing products with exclusive discounts on AliExpress',
  sourceUrl,
  storeId: '1105526094',
  domain: 'eveandlace.com',
  lastRefreshed: '2026-05-18T20:42:00+08:00',
  products: fallbackProducts,
  categories: [
    {
      name: 'Lingerie Sets',
      href: sourceUrl,
      image: '/assets/eve-lace/product-lace-set.png',
      cta: 'Shop Sets'
    },
    {
      name: 'Bodysuits',
      href: sourceUrl,
      image: '/assets/eve-lace/product-teddy.png',
      cta: 'Shop Bodysuits'
    },
    {
      name: 'Robes & Sleep',
      href: sourceUrl,
      image: '/assets/eve-lace/product-robe.png',
      cta: 'Shop Robes'
    },
    {
      name: 'Accessories',
      href: sourceUrl,
      image: '/assets/eve-lace/product-accessory.png',
      cta: 'Shop Accessories'
    }
  ]
};

function isStorefrontData(value: unknown): value is StorefrontData {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<StorefrontData>;
  return Boolean(
    candidate.brand &&
    candidate.sourceUrl &&
    Array.isArray(candidate.products) &&
    candidate.products.length > 0
  );
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

export function formatRefreshTime(value: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Shanghai',
    timeZoneName: 'short'
  }).format(new Date(value));
}
