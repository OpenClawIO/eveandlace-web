# Eve & Lace

Independent storefront for [eveandlace.com](https://eveandlace.com), built from the Eve & Lace AliExpress store profile and deployed on Cloudflare Worker Static Assets.

The site is a static, production-ready storefront for intimate lingerie. It presents curated products, category navigation, private-shopping service notes, language-specific routes, and a data layer that can later be connected to an external store feed.

## Live Site

- Production: [https://eveandlace.com](https://eveandlace.com)
- Cloudflare project: `eveandlace-web`
- Source marketplace: [AliExpress Store 1105526094](https://www.aliexpress.com/store/1105526094)

## Language Routes

| Language | URL |
| --- | --- |
| English | `/` |
| Chinese | `/zh` |
| Spanish | `/es` |
| French | `/fr` |

## Tech Stack

- Next.js 16 static export
- React 19
- TypeScript
- Cloudflare Worker Static Assets
- Wrangler deployment
- pnpm workspace

## Repository Structure

```text
apps/
  web/
    app/                 Next.js App Router pages and shared storefront view
    lib/                 Store data and i18n dictionaries
    public/assets/       Storefront image assets
    wrangler.jsonc       Cloudflare Worker Static Assets config
```

## Local Development

```bash
pnpm install
pnpm --filter web dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build And Typecheck

```bash
pnpm --filter web typecheck
pnpm --filter web build
```

The static export is written to `apps/web/out`.

## Deploy

```bash
cd apps/web
npx wrangler deploy
```

The current deployment is routed to the custom domain `eveandlace.com` through `apps/web/wrangler.jsonc`.

## Store Data Updates

Product and category data live in [apps/web/lib/store-data.ts](./apps/web/lib/store-data.ts). The app uses curated fallback data because AliExpress blocks direct server-side scraping with an anti-bot challenge.

For automated catalog updates, provide a JSON feed through:

```bash
EVE_LACE_STORE_FEED_URL=https://your-feed.example.com/eve-lace.json
```

The feed should return the `StorefrontData` shape defined in `apps/web/lib/store-data.ts`.

## Version History

### 1.1.0 - 2026-05-19

- Added Chinese, Spanish, and French storefront versions.
- Added a language switcher in the header.
- Split the storefront into a shared localized page component.
- Added translation dictionaries for navigation, hero copy, product labels, categories, service blocks, newsletter, footer, and adult-use notice.
- Deployed the multilingual site to Cloudflare Worker Static Assets.

### 1.0.0 - 2026-05-19

- Built the initial Eve & Lace independent storefront.
- Added curated lingerie product and category data.
- Added responsive storefront layout, product rail, category grid, service section, store sync status, and newsletter block.
- Configured Cloudflare deployment for `eveandlace.com`.
- Created and synchronized the GitHub repository.
