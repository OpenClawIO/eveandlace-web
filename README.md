# Eve & Lace

## 中文说明

Eve & Lace 是 [eveandlace.com](https://eveandlace.com) 的独立站项目，基于 Eve & Lace 在 AliExpress 的店铺信息搭建，并部署到 Cloudflare Worker Static Assets。

该网站面向情趣内衣品类，提供多语言静态独立站体验，包括精选商品展示、分类入口、隐私购物服务说明、店铺同步状态和可扩展的商品数据层。

### 线上地址

- 生产站点：[https://eveandlace.com](https://eveandlace.com)
- Cloudflare 项目：`eveandlace-web`
- 来源店铺：[AliExpress Store 1105526094](https://www.aliexpress.com/store/1105526094)

### 语言版本

| 语言 | 访问路径 |
| --- | --- |
| 英文 | `/` |
| 中文 | `/zh` |
| 西语 | `/es` |
| 法语 | `/fr` |

### 技术栈

- Next.js 16 静态导出
- React 19
- TypeScript
- Cloudflare Worker Static Assets
- Wrangler 部署
- pnpm workspace

### 仓库结构

```text
apps/
  web/
    app/                 Next.js App Router 页面和共享店铺页面组件
    lib/                 商品数据与多语言字典
    public/assets/       店铺视觉素材
    wrangler.jsonc       Cloudflare Worker Static Assets 配置
```

### 本地开发

```bash
pnpm install
pnpm --filter web dev
```

打开 [http://localhost:3000](http://localhost:3000)。

### 构建与检查

```bash
pnpm --filter web typecheck
pnpm --filter web build
```

静态导出产物位于 `apps/web/out`。

### 部署

```bash
cd apps/web
npx wrangler deploy
```

当前部署通过 `apps/web/wrangler.jsonc` 绑定自定义域名 `eveandlace.com`。

### 商品数据更新

商品和分类数据位于 [apps/web/lib/store-data.ts](./apps/web/lib/store-data.ts)。由于 AliExpress 会对服务器端直接抓取返回反自动化挑战页面，项目默认使用本地精选备用数据。

线上站点已配置 Cloudflare Worker 后台同步：

- 每天北京时间 03:00 自动执行一次同步。
- 同步结果写入 Cloudflare KV：`STORE_CACHE`。
- 前台页面加载后会请求 `/api/storefront-data`，用最新缓存商品替换构建时备用数据。
- 可通过 `POST /api/sync-storefront` 手动触发一次同步。
- 如果 AliExpress 返回反自动化页面或商品解析失败，系统会保留上一份有效缓存，不会用失败结果覆盖线上商品。

如果需要自动同步商品目录，可以提供 JSON 数据源：

```bash
EVE_LACE_STORE_FEED_URL=https://your-feed.example.com/eve-lace.json
```

该数据源需要返回 `apps/web/lib/store-data.ts` 中定义的 `StorefrontData` JSON 结构。

### 版本记录

#### 1.2.0 - 2026-05-20

- 新增 Cloudflare Worker 后台商品同步。
- 新增每天北京时间 03:00 的 Cron 定时任务。
- 新增 `STORE_CACHE` KV 缓存，用于保存最新商品数据。
- 新增 `/api/storefront-data` 前台读取接口和 `/api/sync-storefront` 手动同步接口。
- 前台改为静态页面加客户端数据刷新，支持商品数据不重建也能更新。
- AliExpress 抓取失败时保留上一份有效数据，并支持后续接入 `STORE_FEED_URL` 稳定数据源。

#### 1.1.1 - 2026-05-19

- 将根目录 README 调整为中英双语文档。
- 补充中文项目说明、语言路径、部署流程和商品同步说明。
- 同步应用 README 与更新日志，方便 GitHub 项目维护。

#### 1.1.0 - 2026-05-19

- 新增中文、西语、法语三个店铺版本。
- 新增头部语言切换器。
- 将首页拆分为共享的本地化页面组件。
- 新增导航、首屏、商品区、分类、服务说明、订阅、页脚和 18+ 提示的多语言字典。
- 将多语言版本部署到 Cloudflare Worker Static Assets。

#### 1.0.0 - 2026-05-19

- 搭建 Eve & Lace 独立站首个生产版本。
- 新增精选情趣内衣商品和分类数据。
- 新增响应式首页、商品横滑区、分类网格、服务说明、店铺同步状态和订阅模块。
- 配置 `eveandlace.com` 的 Cloudflare 部署。
- 创建并同步 GitHub 仓库。

---

## English

Eve & Lace is the independent storefront for [eveandlace.com](https://eveandlace.com), built from the Eve & Lace AliExpress store profile and deployed on Cloudflare Worker Static Assets.

The site is a static, production-ready storefront for intimate lingerie. It presents curated products, category navigation, private-shopping service notes, language-specific routes, and a data layer that can later be connected to an external store feed.

### Live Site

- Production: [https://eveandlace.com](https://eveandlace.com)
- Cloudflare project: `eveandlace-web`
- Source marketplace: [AliExpress Store 1105526094](https://www.aliexpress.com/store/1105526094)

### Language Routes

| Language | URL |
| --- | --- |
| English | `/` |
| Chinese | `/zh` |
| Spanish | `/es` |
| French | `/fr` |

### Tech Stack

- Next.js 16 static export
- React 19
- TypeScript
- Cloudflare Worker Static Assets
- Wrangler deployment
- pnpm workspace

### Repository Structure

```text
apps/
  web/
    app/                 Next.js App Router pages and shared storefront view
    lib/                 Store data and i18n dictionaries
    public/assets/       Storefront image assets
    wrangler.jsonc       Cloudflare Worker Static Assets config
```

### Local Development

```bash
pnpm install
pnpm --filter web dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build And Typecheck

```bash
pnpm --filter web typecheck
pnpm --filter web build
```

The static export is written to `apps/web/out`.

### Deploy

```bash
cd apps/web
npx wrangler deploy
```

The current deployment is routed to the custom domain `eveandlace.com` through `apps/web/wrangler.jsonc`.

### Store Data Updates

Product and category data live in [apps/web/lib/store-data.ts](./apps/web/lib/store-data.ts). The app uses curated fallback data because AliExpress blocks direct server-side scraping with an anti-bot challenge.

The production site now includes Cloudflare Worker background sync:

- A scheduled job runs once per day at 03:00 Asia/Shanghai.
- Sync results are stored in Cloudflare KV: `STORE_CACHE`.
- The storefront requests `/api/storefront-data` after page load and replaces build-time fallback data with the latest cached catalog.
- A manual sync can be triggered with `POST /api/sync-storefront`.
- If AliExpress returns an anti-bot page or parsing fails, the system keeps the last valid cached catalog instead of overwriting production data with a failed result.

For automated catalog updates, provide a JSON feed through:

```bash
EVE_LACE_STORE_FEED_URL=https://your-feed.example.com/eve-lace.json
```

The feed should return the `StorefrontData` shape defined in `apps/web/lib/store-data.ts`.

### Version History

#### 1.2.0 - 2026-05-20

- Added Cloudflare Worker background catalog sync.
- Added a daily Cron trigger at 03:00 Asia/Shanghai.
- Added `STORE_CACHE` KV storage for the latest product payload.
- Added `/api/storefront-data` for the frontend and `/api/sync-storefront` for manual sync runs.
- Changed the frontend to static HTML with client-side catalog refresh so product data can update without a rebuild.
- Preserved the last valid data when AliExpress scraping fails, with optional `STORE_FEED_URL` support for a stable feed source.

#### 1.1.1 - 2026-05-19

- Converted the root README into a bilingual Chinese and English document.
- Added Chinese project overview, language routes, deployment flow, and catalog sync notes.
- Kept the app README and changelog aligned for GitHub maintenance.

#### 1.1.0 - 2026-05-19

- Added Chinese, Spanish, and French storefront versions.
- Added a language switcher in the header.
- Split the storefront into a shared localized page component.
- Added translation dictionaries for navigation, hero copy, product labels, categories, service blocks, newsletter, footer, and adult-use notice.
- Deployed the multilingual site to Cloudflare Worker Static Assets.

#### 1.0.0 - 2026-05-19

- Built the initial Eve & Lace independent storefront.
- Added curated lingerie product and category data.
- Added responsive storefront layout, product rail, category grid, service section, store sync status, and newsletter block.
- Configured Cloudflare deployment for `eveandlace.com`.
- Created and synchronized the GitHub repository.
