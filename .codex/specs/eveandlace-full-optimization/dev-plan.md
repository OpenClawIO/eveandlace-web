# Eve & Lace full optimization plan

## T1 - Foundation and dependency security

- **Type:** default
- **Scope:** root and web package manifests, lockfile, Vitest/Playwright configuration, tracker
- **Depends on:** none
- **Test:** `pnpm audit --prod && pnpm typecheck && pnpm build`
- **Done when:** no critical/high production advisories and the repository has a runnable test harness.

## T2 - Worker security and resilient data sync

- **Type:** default
- **Scope:** `apps/web/src/worker.ts`, `apps/web/src/store-sync.ts`, unit tests
- **Depends on:** T1
- **Test:** `pnpm test:coverage`
- **Done when:** manual sync is fail-closed, external fetches are bounded and validated, last-known-good data is preserved, and new Worker logic has >=90% coverage.

## T3 - Multilingual SEO, UX, and performance

- **Type:** ui
- **Scope:** app layouts/pages/components/styles, metadata/i18n/data helpers, public SEO/header/media assets
- **Depends on:** T1
- **Test:** `pnpm typecheck && pnpm build && pnpm test:e2e`
- **Done when:** all locales have correct source metadata, SEO routes export correctly, unknown pages export a 404, false/nonfunctional claims are removed, and media/a11y findings are fixed.

## T4 - Automation, release, and verification

- **Type:** default
- **Scope:** GitHub workflows, Dependabot, Wrangler config, end-to-end and Lighthouse checks, documentation
- **Depends on:** T2, T3
- **Test:** `pnpm verify && pnpm lighthouse:ci && pnpm test:e2e`
- **Done when:** CI gates every PR, deployment is reproducible, production probes pass, a rollback reference is recorded, and the tracker contains evidence.

