# Eve & Lace full optimization tracker

Branch: `codex/full-optimization`  
Baseline commit: `a0416049ec5e`  
Started: 2026-11-05

## Baseline

- Production routes `/`, `/zh`, `/es`, `/fr`, `/ar`: 200.
- `/robots.txt`, `/sitemap.xml`, and unknown routes: 500.
- Lighthouse mobile: Performance 95, Accessibility 96, Best Practices 100, SEO 92.
- Production dependency audit: 52 advisories (5 critical, 25 high).
- No tests or GitHub Actions workflows.
- Manual sync endpoint allows unauthenticated writes when `SYNC_SECRET` is unset.
- Cloudflare credential in macOS Keychain is invalid; deployment is blocked until replaced.

## Work

- [x] T1: dependency security, test harness, and progress documentation
- [x] T2: Worker authentication, resilient sync, API headers, and unit coverage
- [x] T3: multilingual SEO, error routes, trustworthy content, responsive UI, and optimized media
- [x] T4: CI/CD, Dependabot, Cloudflare headers/config, end-to-end tests, and release verification
- [ ] T5: review, commit, push, draft PR, preview/production deployment, and rollback verification

## Acceptance criteria

- [x] No known critical/high production dependency advisories.
- [x] Build, typecheck, unit tests, coverage, and end-to-end smoke tests pass.
- [x] New Worker business logic has at least 90% statement/line/function coverage.
- [x] Manual sync requires a configured secret and a valid bearer token.
- [x] `robots.txt` and `sitemap.xml` return 200; unknown routes return 404 in the release build.
- [x] All five locales expose correct HTML language/direction, canonical, hreflang, and localized metadata.
- [x] Nonfunctional newsletter UI is removed; stale/fallback product data is labeled honestly.
- [x] Responsive images have explicit dimensions and modern formats.
- [ ] Production security/cache headers are present after deployment.
- [x] Lighthouse targets: Performance 100, Accessibility 100, Best Practices 100, SEO 100.
- [ ] Previous Cloudflare deployment remains available for rollback.

## Blockers and decisions

- Cloudflare: valid technical-operations API token required for account inspection and deployment.
- Business content: do not invent product deep links, return promises, legal terms, or contact details.
- Newsletter: removed until a real provider and consent workflow are selected.

## Verification log

| Date | Check | Result |
| --- | --- | --- |
| 2026-11-05 | Remote main build/typecheck | Pass |
| 2026-11-05 | Production route probe | Fail: robots/sitemap/unknown = 500 |
| 2026-11-05 | Production dependency audit | Fail: 5 critical, 25 high |
| 2026-11-05 | Final production dependency audit | Pass: no known vulnerabilities |
| 2026-11-05 | Typecheck and static export | Pass: 10 static routes |
| 2026-11-05 | Worker unit suite | Pass: 19 tests; 97.25% statements, 98.71% lines, 100% functions |
| 2026-11-05 | Desktop/mobile end-to-end suite | Pass: 14 tests |
| 2026-11-05 | Lighthouse across `/`, `/zh`, `/es`, `/fr`, `/ar` | Pass: 100/100/100/100 |
| 2026-11-05 | Desktop, mobile, Chinese, and Arabic RTL visual review | Pass |

