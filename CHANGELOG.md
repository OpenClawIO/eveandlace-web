# Changelog

All notable project updates are recorded here.

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
