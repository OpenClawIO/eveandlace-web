import { fallbackData, isStorefrontData, sourceUrl, type StoreCategory, type StoreProduct, type StorefrontData } from '../lib/store-data';

type KVNamespace = {
  get(key: string, options?: { type: 'json' }): Promise<unknown | null>;
  put(key: string, value: string): Promise<void>;
};

type Fetcher = {
  fetch(request: Request): Promise<Response>;
};

type ExecutionContext = {
  waitUntil(promise: Promise<unknown>): void;
};

type ScheduledController = {
  scheduledTime: number;
  cron: string;
};

type Env = {
  ASSETS: Fetcher;
  STORE_CACHE: KVNamespace;
  STORE_SOURCE_URL?: string;
  STORE_FEED_URL?: string;
  EVE_LACE_STORE_FEED_URL?: string;
  SYNC_SECRET?: string;
};

const STORE_CACHE_KEY = 'storefront-data';
const SYNC_LOG_KEY = 'storefront-sync-log';

const jsonHeaders = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'public, max-age=300'
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (url.pathname === '/api/storefront-data') {
      const data = await readCachedStorefront(env);
      return Response.json(data, { headers: jsonHeaders });
    }

    if (url.pathname === '/api/sync-storefront') {
      if (request.method !== 'POST') {
        return Response.json({ error: 'Method not allowed' }, { status: 405 });
      }

      if (env.SYNC_SECRET && request.headers.get('authorization') !== `Bearer ${env.SYNC_SECRET}`) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const syncPromise = syncStorefront(env);
      ctx.waitUntil(syncPromise);
      const data = await syncPromise;
      return Response.json(data, { headers: { ...jsonHeaders, 'cache-control': 'no-store' } });
    }

    return env.ASSETS.fetch(request);
  },

  async scheduled(_controller: ScheduledController, env: Env) {
    await syncStorefront(env);
  }
};

async function readCachedStorefront(env: Env): Promise<StorefrontData> {
  const cached = await env.STORE_CACHE.get(STORE_CACHE_KEY, { type: 'json' });
  return isStorefrontData(cached) ? cached : fallbackData;
}

async function syncStorefront(env: Env): Promise<StorefrontData> {
  const previous = await readCachedStorefront(env);

  try {
    const feedUrl = env.EVE_LACE_STORE_FEED_URL ?? env.STORE_FEED_URL;
    const data = feedUrl ? await syncFromFeed(feedUrl) : await syncFromAliExpress(env.STORE_SOURCE_URL ?? sourceUrl);
    await env.STORE_CACHE.put(STORE_CACHE_KEY, JSON.stringify(data));
    await env.STORE_CACHE.put(
      SYNC_LOG_KEY,
      JSON.stringify({
        ok: true,
        source: data.syncStatus?.source,
        lastRefreshed: data.lastRefreshed,
        productCount: data.products.length
      })
    );
    return data;
  } catch (error) {
    await env.STORE_CACHE.put(
      SYNC_LOG_KEY,
      JSON.stringify({
        ok: false,
        lastAttemptedAt: new Date().toISOString(),
        message: error instanceof Error ? error.message : 'Unknown sync error'
      })
    );
    return previous;
  }
}

async function syncFromFeed(feedUrl: string): Promise<StorefrontData> {
  const response = await fetch(feedUrl, { headers: { accept: 'application/json' } });

  if (!response.ok) {
    throw new Error(`Feed request failed: ${response.status}`);
  }

  const payload = (await response.json()) as unknown;
  if (!isStorefrontData(payload)) {
    throw new Error('Feed payload does not match StorefrontData.');
  }

  return {
    ...payload,
    lastRefreshed: new Date().toISOString(),
    syncStatus: {
      source: 'feed',
      message: 'Synced from configured JSON feed.'
    }
  };
}

async function syncFromAliExpress(storeUrl: string): Promise<StorefrontData> {
  const response = await fetch(storeUrl, {
    headers: {
      accept: 'text/html,application/xhtml+xml',
      'accept-language': 'en-US,en;q=0.9',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36'
    }
  });

  if (!response.ok) {
    throw new Error(`AliExpress request failed: ${response.status}`);
  }

  const html = await response.text();
  if (isChallengePage(html)) {
    throw new Error('AliExpress returned an anti-bot challenge page.');
  }

  const products = parseProductsFromHtml(html, storeUrl);
  if (!products.length) {
    throw new Error('No products were found in the AliExpress store HTML.');
  }

  return {
    ...fallbackData,
    sourceUrl: storeUrl,
    lastRefreshed: new Date().toISOString(),
    products,
    categories: hydrateCategories(products, storeUrl),
    syncStatus: {
      source: 'aliexpress',
      message: 'Synced from AliExpress store page.'
    }
  };
}

function isChallengePage(html: string) {
  const marker = html.toLowerCase();
  return marker.includes('punish') || marker.includes('captcha') || marker.includes('login.html') || marker.includes('robot');
}

function parseProductsFromHtml(html: string, storeUrl: string): StoreProduct[] {
  return uniqueProducts([...parseJsonLdProducts(html, storeUrl), ...parseAnchorProducts(html, storeUrl)]).slice(0, 12);
}

function parseJsonLdProducts(html: string, storeUrl: string): StoreProduct[] {
  const products: StoreProduct[] = [];
  const scripts = html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);

  for (const script of scripts) {
    const text = stripHtml(script[1]).trim();

    try {
      collectProductsFromJson(JSON.parse(text), products, storeUrl);
    } catch {
      continue;
    }
  }

  return products;
}

function collectProductsFromJson(value: unknown, products: StoreProduct[], storeUrl: string) {
  if (!value || typeof value !== 'object') {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectProductsFromJson(item, products, storeUrl));
    return;
  }

  const candidate = value as Record<string, unknown>;
  if (candidate['@type'] === 'Product' || candidate.type === 'Product') {
    const title = asString(candidate.name);
    const href = absolutizeUrl(asString(candidate.url), storeUrl);
    const image = normalizeImage(candidate.image);
    const price = normalizePrice(candidate.offers);

    if (title && href) {
      products.push(createProduct({ title, href, image, price }));
    }
  }

  Object.values(candidate).forEach((item) => collectProductsFromJson(item, products, storeUrl));
}

function parseAnchorProducts(html: string, storeUrl: string): StoreProduct[] {
  const products: StoreProduct[] = [];
  const anchorPattern = /<a\b[^>]*href=["']([^"']*\/item\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;

  for (const match of html.matchAll(anchorPattern)) {
    const href = absolutizeUrl(match[1], storeUrl);
    const body = match[2];
    const img = body.match(/<img\b[^>]*(?:src|data-src)=["']([^"']+)["'][^>]*>/i);
    const alt = body.match(/<img\b[^>]*alt=["']([^"']+)["'][^>]*>/i);
    const text = stripHtml(body).replace(/\s+/g, ' ').trim();
    const title = cleanTitle(stripHtml(alt?.[1] ?? text));

    if (href && title && !title.toLowerCase().includes('aliexpress')) {
      products.push(createProduct({ title, href, image: normalizeImage(img?.[1]), price: extractPrice(text) }));
    }
  }

  return products;
}

function createProduct(input: { title: string; href: string; image?: string; price?: string }): StoreProduct {
  const category = inferCategory(input.title);

  return {
    id: extractProductId(input.href) ?? slugify(input.title),
    title: cleanTitle(input.title),
    category,
    price: input.price ?? 'See store',
    image: input.image ?? fallbackImage(category),
    href: input.href,
    updatedAt: new Date().toISOString()
  };
}

function uniqueProducts(products: StoreProduct[]) {
  const seen = new Set<string>();

  return products.filter((product) => {
    if (!product.id || seen.has(product.id)) {
      return false;
    }

    seen.add(product.id);
    return true;
  });
}

function hydrateCategories(products: StoreProduct[], href: string): StoreCategory[] {
  return fallbackData.categories.map((category) => {
    const match = products.find((product) => categoryMatchesProduct(category.id, product.category));
    return {
      ...category,
      href,
      image: match?.image ?? category.image
    };
  });
}

function categoryMatchesProduct(categoryId: StoreCategory['id'], productCategory: StoreProduct['category']) {
  return (
    (categoryId === 'sets' && productCategory === 'Sets') ||
    (categoryId === 'bodysuits' && productCategory === 'Bodysuits') ||
    (categoryId === 'robes' && productCategory === 'Robes') ||
    (categoryId === 'accessories' && productCategory === 'Accessories')
  );
}

function inferCategory(title: string): StoreProduct['category'] {
  const normalized = title.toLowerCase();

  if (normalized.includes('robe') || normalized.includes('sleep')) {
    return 'Robes';
  }

  if (normalized.includes('body') || normalized.includes('teddy')) {
    return 'Bodysuits';
  }

  if (normalized.includes('accessory') || normalized.includes('stocking') || normalized.includes('garter')) {
    return 'Accessories';
  }

  return 'Sets';
}

function fallbackImage(category: StoreProduct['category']) {
  if (category === 'Bodysuits') {
    return '/assets/eve-lace/product-teddy.png';
  }

  if (category === 'Robes') {
    return '/assets/eve-lace/product-robe.png';
  }

  if (category === 'Accessories') {
    return '/assets/eve-lace/product-accessory.png';
  }

  return '/assets/eve-lace/product-lace-set.png';
}

function asString(value: unknown) {
  return typeof value === 'string' ? value : undefined;
}

function normalizeImage(value: unknown) {
  const image = Array.isArray(value) ? value[0] : value;
  const imageUrl = asString(image);

  if (!imageUrl) {
    return undefined;
  }

  if (imageUrl.startsWith('//')) {
    return `https:${imageUrl}`;
  }

  return imageUrl;
}

function normalizePrice(offers: unknown) {
  if (!offers || typeof offers !== 'object') {
    return undefined;
  }

  const offer = Array.isArray(offers) ? offers[0] : offers;
  if (!offer || typeof offer !== 'object') {
    return undefined;
  }

  const record = offer as Record<string, unknown>;
  const price = asString(record.price) ?? asString(record.lowPrice);
  const currency = asString(record.priceCurrency) ?? 'USD';

  return price ? `${currency === 'USD' ? '$' : `${currency} `}${price}` : undefined;
}

function extractPrice(text: string) {
  return text.match(/(?:US\s*)?\$\s?\d+(?:\.\d{2})?/)?.[0]?.replace(/\s+/g, '') ?? undefined;
}

function absolutizeUrl(href: string | undefined, baseUrl: string) {
  if (!href) {
    return baseUrl;
  }

  if (href.startsWith('//')) {
    return `https:${href}`;
  }

  try {
    return new URL(href, baseUrl).toString();
  } catch {
    return baseUrl;
  }
}

function extractProductId(href: string) {
  return href.match(/\/item\/(\d+)\.html/i)?.[1] ?? href.match(/[?&]productId=(\d+)/i)?.[1];
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
}

function stripHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function cleanTitle(value: string) {
  return value.replace(/\s+/g, ' ').trim().slice(0, 140);
}
