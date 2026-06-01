# Changelog

All notable project updates are recorded here.

## 1.2.5 - 2026-06-01

### Added

- Added the Eve & Lace logo favicon for browser tabs and saved shortcuts.

## 1.2.4 - 2026-06-01

### Changed

- Removed Easy returns messaging from the top strip.
- Added footer contact information with email, telephone, and location.

## 1.2.3 - 2026-05-28

### Changed

- The storefront now renders every product returned by the synchronized catalog instead of limiting the product section to seven cards.
- Removed the Worker HTML parser cap that previously kept at most twelve parsed AliExpress products.
- Added visible listed-product counts to the product section in every supported language.

## 1.2.2 - 2026-05-21

### Added

- Added the official Eve & Lace company logo asset to the storefront.
- Replaced text-only brand marks in the header and footer with the company logo.

## 1.2.1 - 2026-05-20

### Added

- Arabic storefront at `/ar`.
- Arabic translations for navigation, hero content, product titles, category labels, service blocks, newsletter copy, footer content, and adult-use notices.
- RTL page direction for Arabic storefront rendering.

## 1.2.0 - 2026-05-20

### Added

- Cloudflare Worker background sync for storefront product data.
- Daily cron trigger at `0 19 * * *`, which runs at 03:00 Asia/Shanghai.
- `STORE_CACHE` KV namespace for the latest synced storefront payload.
- `/api/storefront-data` endpoint for the static frontend to load the latest cached catalog.
- `/api/sync-storefront` endpoint for manual sync runs.
- AliExpress HTML parsing with JSON-LD and product-link extraction fallbacks.
- Optional `STORE_FEED_URL` support for a stable JSON catalog feed when AliExpress blocks direct scraping.

### Changed

- Refactored the storefront rendering into a client-hydrated component so the static site can update product data without a rebuild.
- Preserved the last valid cached catalog when a marketplace sync fails.

## 1.1.1 - 2026-05-19

### Added

- Bilingual Chinese and English root README.
- Bilingual Chinese and English Web app README.
- Documentation notes for language routes, local development, deployment, catalog sync, and version history in both languages.

### Changed

- Expanded project documentation so GitHub readers can understand and maintain the storefront in either Chinese or English.

## 1.1.0 - 2026-05-19

### Added

- Chinese storefront at `/zh`.
- Spanish storefront at `/es`.
- French storefront at `/fr`.
- Header language switcher across all storefront routes.
- Central i18n dictionary for navigation, hero content, product sections, category labels, service blocks, newsletter copy, footer content, and adult-use notices.

### Changed

- Refactored the homepage into a shared localized storefront component.
- Updated store data categories with stable IDs for localized labels.
- Expanded project documentation for deployment, languages, and catalog sync.

### Deployed

- Published the multilingual build to Cloudflare Worker Static Assets for `eveandlace.com`.

## 1.0.0 - 2026-05-19

### Added

- Initial Eve & Lace independent storefront.
- Curated fallback catalog for intimate lingerie products.
- Responsive storefront UI with hero, product rail, category grid, service notes, store sync card, newsletter signup, and footer.
- Cloudflare Worker Static Assets configuration for the custom domain.
- GitHub repository setup.
