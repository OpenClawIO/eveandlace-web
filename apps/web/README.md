# Eve & Lace Web App

Next.js storefront for [eveandlace.com](https://eveandlace.com).

## Overview

This app exports a static multilingual storefront and deploys it to Cloudflare Worker Static Assets. The product experience is designed for adult intimate lingerie retail with restrained editorial styling, discreet service messaging, and marketplace-backed product links.

## Routes

| Route | Language |
| --- | --- |
| `/` | English |
| `/zh` | Chinese |
| `/es` | Spanish |
| `/fr` | French |

Each route uses the same storefront component in `app/storefront-page.tsx` with localized copy from `lib/i18n.ts`.

## Key Files

- `app/storefront-page.tsx` - shared storefront layout.
- `lib/i18n.ts` - language dictionaries and route metadata.
- `lib/store-data.ts` - curated fallback products, categories, and optional feed loader.
- `public/assets/eve-lace/` - storefront imagery.
- `wrangler.jsonc` - Cloudflare deployment and custom-domain route.

## Development

```bash
pnpm --filter web dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality Checks

```bash
pnpm --filter web typecheck
pnpm --filter web build
```

## Deployment

```bash
pnpm --filter web build
cd apps/web
npx wrangler deploy
```

Cloudflare serves the static export from `apps/web/out` and routes the Worker to `eveandlace.com`.

## Catalog Sync

The app first tries to read product data from `EVE_LACE_STORE_FEED_URL`. If the feed is unavailable, it falls back to local curated data.

```bash
EVE_LACE_STORE_FEED_URL=https://your-feed.example.com/eve-lace.json
```

The feed must return the `StorefrontData` JSON shape exported from `lib/store-data.ts`.

## Release Notes

### 1.1.0 - 2026-05-19

- Added Chinese, Spanish, and French static routes.
- Added localized navigation, product section text, category CTAs, service copy, sync status, newsletter text, footer links, and 18+ notice.
- Added header language switcher with active-route styling.
- Verified local typecheck and production build.
- Deployed the multilingual build to Cloudflare.

### 1.0.0 - 2026-05-19

- Created the first production storefront for Eve & Lace.
- Added responsive homepage sections and curated fallback catalog data.
- Added Cloudflare Worker Static Assets configuration and custom-domain deployment.
