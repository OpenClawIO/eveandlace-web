import { describe, expect, it, vi } from 'vitest';
import { fallbackData, type StorefrontData } from '../lib/store-data';
import {
  parseProductsFromHtml,
  readCachedStorefront,
  readLimitedText,
  fetchWithTimeout,
  syncFromAliExpress,
  syncFromFeed,
  syncStorefront,
  type KVNamespaceLike
} from './store-sync';

class MemoryKV implements KVNamespaceLike {
  values = new Map<string, string>();

  async get(key: string) {
    const value = this.values.get(key);
    return value ? JSON.parse(value) : null;
  }

  async put(key: string, value: string) {
    this.values.set(key, value);
  }
}

function validFeed(): StorefrontData {
  return {
    ...fallbackData,
    products: fallbackData.products.map((product) => ({ ...product })),
    categories: fallbackData.categories.map((category) => ({ ...category }))
  };
}

describe('store sync', () => {
  it('uses valid cached data and falls back for malformed cache data', async () => {
    const kv = new MemoryKV();
    expect(await readCachedStorefront({ STORE_CACHE: kv })).toBe(fallbackData);

    const cached = validFeed();
    await kv.put('storefront-data', JSON.stringify(cached));
    expect(await readCachedStorefront({ STORE_CACHE: kv })).toEqual(cached);

    await kv.put('storefront-data', JSON.stringify({ brand: 'broken' }));
    expect(await readCachedStorefront({ STORE_CACHE: kv })).toBe(fallbackData);
  });

  it('syncs a validated JSON feed and records success', async () => {
    const kv = new MemoryKV();
    const payload = validFeed();
    const fetcher = vi.fn(async () =>
      new Response(JSON.stringify(payload), { headers: { 'content-type': 'application/json' } })
    );

    const result = await syncStorefront({ STORE_CACHE: kv, STORE_FEED_URL: 'https://example.com/feed.json' }, fetcher);

    expect(result.syncStatus?.source).toBe('feed');
    expect(fetcher).toHaveBeenCalledOnce();
    expect(JSON.parse(kv.values.get('storefront-data') ?? '{}').products).toHaveLength(payload.products.length);
    expect(JSON.parse(kv.values.get('storefront-sync-log') ?? '{}')).toMatchObject({ ok: true, source: 'feed' });
  });

  it('preserves last-known-good data when an upstream sync fails', async () => {
    const kv = new MemoryKV();
    const previous = validFeed();
    await kv.put('storefront-data', JSON.stringify(previous));
    const fetcher = vi.fn(async () => new Response('no', { status: 500, headers: { 'content-type': 'text/plain' } }));

    const result = await syncStorefront({ STORE_CACHE: kv, STORE_FEED_URL: 'https://example.com/feed.json' }, fetcher);

    expect(result).toEqual(previous);
    expect(JSON.parse(kv.values.get('storefront-data') ?? '{}')).toEqual(previous);
    expect(JSON.parse(kv.values.get('storefront-sync-log') ?? '{}')).toMatchObject({ ok: false });
  });

  it('records non-Error upstream failures without replacing the cache', async () => {
    const kv = new MemoryKV();
    const fetcher = vi.fn(async () => { throw 'network unavailable'; });
    const result = await syncStorefront({ STORE_CACHE: kv, STORE_FEED_URL: 'https://example.com/feed.json' }, fetcher);
    expect(result).toBe(fallbackData);
    expect(JSON.parse(kv.values.get('storefront-sync-log') ?? '{}')).toMatchObject({
      ok: false,
      message: 'Unknown sync error'
    });
  });

  it('rejects unexpected content types and invalid feed data', async () => {
    await expect(
      syncFromFeed('https://example.com/feed', async () => new Response('no', { status: 502 }))
    ).rejects.toThrow('Feed request failed: 502');
    await expect(
      syncFromFeed('https://example.com/feed', async () => new Response('{}', { headers: { 'content-type': 'text/html' } }))
    ).rejects.toThrow('unexpected content type');

    await expect(
      syncFromFeed('https://example.com/feed', async () => new Response('{}', { headers: { 'content-type': 'application/json' } }))
    ).rejects.toThrow('does not match');
  });

  it('aborts a fetch that exceeds its deadline', async () => {
    const fetcher = vi.fn((_input: RequestInfo | URL, init?: RequestInit) =>
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
      })
    );
    await expect(fetchWithTimeout('https://example.com', {}, fetcher, 1)).rejects.toMatchObject({ name: 'AbortError' });
  });

  it('bounds upstream response bodies using declared and streamed sizes', async () => {
    await expect(
      readLimitedText(new Response('small', { headers: { 'content-length': '5000' } }), 10)
    ).rejects.toThrow('exceeded');

    await expect(readLimitedText(new Response('a'.repeat(20)), 10)).rejects.toThrow('exceeded');
    await expect(readLimitedText(new Response(null), 10)).resolves.toBe('');
  });

  it('parses and deduplicates JSON-LD and anchor products', () => {
    const html = `
      <script type="application/ld+json">
        {"@type":"Product","name":"Satin Robe","url":"/item/101.html","image":"//cdn.example/robe.jpg","offers":{"price":"29.95","priceCurrency":"USD"}}
      </script>
      <a href="/item/102.html"><img src="//cdn.example/body.jpg" alt="Lace Bodysuit">US $19.99</a>
      <a href="/item/102.html"><img src="//cdn.example/body.jpg" alt="Lace Bodysuit">US $19.99</a>
      <a href="/item/103.html"><img src="//cdn.example/stocking.jpg" alt="Garter Accessory">$8.00</a>
    `;

    const products = parseProductsFromHtml(html, 'https://www.aliexpress.com/store/1');
    expect(products).toHaveLength(3);
    expect(products.map((product) => product.category)).toEqual(['Robes', 'Bodysuits', 'Accessories']);
    expect(products[0]).toMatchObject({ id: '101', price: '$29.95', image: 'https://cdn.example/robe.jpg' });
  });

  it('returns no products for invalid JSON-LD and unrelated anchors', () => {
    const html = '<script type="application/ld+json">{bad}</script><a href="/about">About</a>';
    expect(parseProductsFromHtml(html, 'https://www.aliexpress.com/store/1')).toEqual([]);
  });

  it('syncs valid marketplace HTML and hydrates every category', async () => {
    const html = `
      <script type="application/ld+json">
        [{"@type":"Product","name":"Classic Set","url":"/item/201.html","offers":[{"lowPrice":"12.50","priceCurrency":"EUR"}]},
        {"nested":{"@type":"Product","name":"Sleep Robe","url":"/item/202.html","image":["//cdn.example/robe.jpg"]}}]
      </script>
      <a href="/item/203.html"><img alt="Soft Teddy">$18.00</a>
      <a href="/item/204.html"><img alt="Garter Accessory">$7.00</a>
    `;
    const result = await syncFromAliExpress(
      'https://www.aliexpress.com/store/1',
      async () => new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } })
    );
    expect(result.products).toHaveLength(4);
    expect(result.products[0].price).toBe('EUR 12.50');
    expect(result.categories.every((category) => category.href.endsWith('/store/1'))).toBe(true);
    expect(result.syncStatus?.source).toBe('aliexpress');
  });

  it('rejects failed, challenged, wrongly typed, and empty marketplace responses', async () => {
    await expect(
      syncFromAliExpress('https://example.com', async () => new Response('no', { status: 403 }))
    ).rejects.toThrow('AliExpress request failed: 403');
    await expect(
      syncFromAliExpress('https://example.com', async () => new Response('{}', { headers: { 'content-type': 'application/json' } }))
    ).rejects.toThrow('unexpected content type');
    await expect(
      syncFromAliExpress('https://example.com', async () => new Response('captcha robot', { headers: { 'content-type': 'text/html' } }))
    ).rejects.toThrow('anti-bot');
    await expect(
      syncFromAliExpress('https://example.com', async () => new Response('<html></html>', { headers: { 'content-type': 'text/html' } }))
    ).rejects.toThrow('No products');
  });

  it('uses safe fallbacks for incomplete marketplace product markup', () => {
    const html = `
      <a href="/item/custom-set.html">Everyday Set</a>
      <a href="/item/custom-body.html">Lace Body</a>
      <a href="/item/custom-robe.html">Night Robe</a>
      <a href="/item/custom-accessory.html">Stocking Accessory</a>
      <a href="/item/ignored.html"><img alt="AliExpress">AliExpress</a>
    `;
    const products = parseProductsFromHtml(html, 'https://www.aliexpress.com/store/1');
    expect(products).toHaveLength(4);
    expect(products.map((product) => product.price)).toEqual(['See store', 'See store', 'See store', 'See store']);
    expect(products.map((product) => product.image)).toEqual([
      '/assets/eve-lace/product-lace-set.webp',
      '/assets/eve-lace/product-teddy.webp',
      '/assets/eve-lace/product-robe.webp',
      '/assets/eve-lace/product-accessory.webp'
    ]);
    expect(products[0].id).toBe('everyday-set');
  });
});
