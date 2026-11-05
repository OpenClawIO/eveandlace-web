import { readCachedStorefront, syncStorefront, type StoreSyncEnv } from './store-sync';

type Fetcher = { fetch(request: Request): Promise<Response> };
type Env = StoreSyncEnv & { ASSETS: Fetcher; SYNC_SECRET?: string };
type ScheduledController = { scheduledTime: number; cron: string };

const apiHeaders = {
  'content-type': 'application/json; charset=utf-8',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'no-referrer'
};

function json(data: unknown, init: ResponseInit = {}) {
  return Response.json(data, { ...init, headers: { ...apiHeaders, ...init.headers } });
}

export function authorizeManualSync(request: Request, secret?: string) {
  if (!secret) {
    return { ok: false as const, status: 503, message: 'Manual sync is not configured.' };
  }
  if (request.headers.get('authorization') !== `Bearer ${secret}`) {
    return { ok: false as const, status: 401, message: 'Unauthorized.' };
  }
  return { ok: true as const };
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/storefront-data') {
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        return json({ error: 'Method not allowed.' }, { status: 405, headers: { allow: 'GET, HEAD' } });
      }
      const data = await readCachedStorefront(env);
      return json(data, { headers: { 'cache-control': 'public, max-age=300, stale-while-revalidate=3600' } });
    }

    if (url.pathname === '/api/sync-storefront') {
      if (request.method !== 'POST') {
        return json({ error: 'Method not allowed.' }, { status: 405, headers: { allow: 'POST' } });
      }

      const authorization = authorizeManualSync(request, env.SYNC_SECRET);
      if (!authorization.ok) {
        return json(
          { error: authorization.message },
          { status: authorization.status, headers: { 'cache-control': 'no-store' } }
        );
      }

      const data = await syncStorefront(env);
      return json(data, { headers: { 'cache-control': 'no-store' } });
    }

    try {
      return await env.ASSETS.fetch(request);
    } catch {
      return new Response('Service unavailable', {
        status: 503,
        headers: { ...apiHeaders, 'content-type': 'text/plain; charset=utf-8' }
      });
    }
  },

  async scheduled(_controller: ScheduledController, env: Env) {
    await syncStorefront(env);
  }
};
