# Eve & Lace Web

Independent storefront for `eveandlace.com`, based on the AliExpress store:

https://www.aliexpress.com/store/1105526094

## Run

```bash
pnpm --filter web dev
```

Open http://localhost:3000.

## Languages

The storefront ships four static language versions:

- English: `/`
- Chinese: `/zh`
- Spanish: `/es`
- French: `/fr`

## Cloudflare Pages

This app is configured for static export and Worker Static Assets. Build output is written to `apps/web/out`.

```bash
pnpm --filter web build
cd apps/web
npx wrangler deploy
```

## Store Sync

The storefront reads product data from `apps/web/lib/store-data.ts`.

By default it uses a local curated fallback because AliExpress blocks direct server-side scraping with a challenge page. For live updates, deploy with an environment variable:

```bash
EVE_LACE_STORE_FEED_URL=https://your-feed.example.com/eve-lace.json
```

The feed should return the `StorefrontData` JSON shape exported from `store-data.ts`. The page revalidates the feed hourly when the hosting platform supports Next.js server rendering.
