import { afterEach, describe, expect, it, vi } from 'vitest';
import { fallbackData } from '../lib/store-data';
import worker, { authorizeManualSync } from './worker';
import type { KVNamespaceLike } from './store-sync';

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

function env(overrides: Record<string, unknown> = {}) {
  return {
    STORE_CACHE: new MemoryKV(),
    ASSETS: { fetch: vi.fn(async () => new Response('asset', { status: 200 })) },
    ...overrides
  };
}

afterEach(() => vi.unstubAllGlobals());

describe('worker', () => {
  it('fails closed when manual sync is not configured or authorized', () => {
    const request = new Request('https://eveandlace.com/api/sync-storefront', { method: 'POST' });
    expect(authorizeManualSync(request)).toMatchObject({ ok: false, status: 503 });
    expect(authorizeManualSync(request, 'secret')).toMatchObject({ ok: false, status: 401 });

    const authorized = new Request(request, { headers: { authorization: 'Bearer secret' } });
    expect(authorizeManualSync(authorized, 'secret')).toEqual({ ok: true });
  });

  it('serves cached storefront data with bounded caching', async () => {
    const response = await worker.fetch(new Request('https://eveandlace.com/api/storefront-data'), env() as never);
    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toContain('stale-while-revalidate');
    expect((await response.json()) as unknown).toMatchObject({ brand: fallbackData.brand });
  });

  it('rejects unsupported API methods', async () => {
    const dataResponse = await worker.fetch(
      new Request('https://eveandlace.com/api/storefront-data', { method: 'POST' }),
      env() as never
    );
    const syncResponse = await worker.fetch(new Request('https://eveandlace.com/api/sync-storefront'), env() as never);
    expect(dataResponse.status).toBe(405);
    expect(syncResponse.status).toBe(405);
  });

  it('rejects unauthorized sync without touching the upstream', async () => {
    const response = await worker.fetch(
      new Request('https://eveandlace.com/api/sync-storefront', { method: 'POST' }),
      env({ SYNC_SECRET: 'secret' }) as never
    );
    expect(response.status).toBe(401);
    expect(response.headers.get('cache-control')).toBe('no-store');
  });

  it('runs authorized feed sync and disables response caching', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify(fallbackData), { headers: { 'content-type': 'application/json' } }))
    );
    const request = new Request('https://eveandlace.com/api/sync-storefront', {
      method: 'POST',
      headers: { authorization: 'Bearer secret' }
    });
    const response = await worker.fetch(
      request,
      env({ SYNC_SECRET: 'secret', STORE_FEED_URL: 'https://example.com/feed.json' }) as never
    );
    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toBe('no-store');
  });

  it('delegates static routes and returns a safe error if asset serving fails', async () => {
    const assetEnv = env();
    const response = await worker.fetch(new Request('https://eveandlace.com/'), assetEnv as never);
    expect(await response.text()).toBe('asset');

    const failed = await worker.fetch(
      new Request('https://eveandlace.com/missing'),
      env({ ASSETS: { fetch: vi.fn(async () => { throw new Error('binding failed'); }) } }) as never
    );
    expect(failed.status).toBe(503);
    expect(await failed.text()).toBe('Service unavailable');
  });

  it('runs scheduled synchronization', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify(fallbackData), { headers: { 'content-type': 'application/json' } }))
    );
    const scheduledEnv = env({ STORE_FEED_URL: 'https://example.com/feed.json' });
    await worker.scheduled({ scheduledTime: Date.now(), cron: '0 19 * * *' }, scheduledEnv as never);
    expect((scheduledEnv.STORE_CACHE as MemoryKV).values.has('storefront-data')).toBe(true);
  });
});
