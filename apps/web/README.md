# Eve & Lace Web App

## 中文说明

这是 [eveandlace.com](https://eveandlace.com) 的 Next.js 前台应用。

应用以静态方式导出多语言店铺页面，并通过 Cloudflare Worker Static Assets 部署。产品体验面向成人情趣内衣零售场景，强调克制的视觉风格、隐私购物说明和跳转到来源店铺的商品链接。

### 路由

| 路由 | 语言 |
| --- | --- |
| `/` | 英文 |
| `/zh` | 中文 |
| `/es` | 西语 |
| `/fr` | 法语 |

每个路由都复用 `app/storefront-page.tsx` 中的店铺页面组件，并从 `lib/i18n.ts` 读取本地化文案。

### 关键文件

- `app/storefront-page.tsx` - 共享店铺页面布局。
- `lib/i18n.ts` - 语言字典和语言路由信息。
- `lib/store-data.ts` - 精选备用商品、分类数据和可选数据源加载逻辑。
- `public/assets/eve-lace/` - 店铺图片素材。
- `wrangler.jsonc` - Cloudflare 部署和自定义域名配置。

### 开发

```bash
pnpm --filter web dev
```

打开 [http://localhost:3000](http://localhost:3000)。

### 质量检查

```bash
pnpm --filter web typecheck
pnpm --filter web build
```

### 部署

```bash
pnpm --filter web build
cd apps/web
npx wrangler deploy
```

Cloudflare 会从 `apps/web/out` 提供静态导出内容，并将 Worker 路由到 `eveandlace.com`。

### 商品目录同步

应用会优先尝试从 `EVE_LACE_STORE_FEED_URL` 读取商品数据。如果数据源不可用，则回退到本地精选数据。

```bash
EVE_LACE_STORE_FEED_URL=https://your-feed.example.com/eve-lace.json
```

该数据源必须返回 `lib/store-data.ts` 中导出的 `StorefrontData` JSON 结构。

### 更新记录

#### 1.1.1 - 2026-05-19

- 将 Web 应用 README 调整为中英双语文档。
- 补充中文路由、关键文件、开发、检查、部署和商品同步说明。

#### 1.1.0 - 2026-05-19

- 新增中文、西语、法语静态路由。
- 新增导航、商品区、分类 CTA、服务说明、同步状态、订阅、页脚链接和 18+ 提示的本地化文案。
- 新增带当前语言状态的头部语言切换器。
- 已验证本地类型检查和生产构建。
- 已将多语言版本部署到 Cloudflare。

#### 1.0.0 - 2026-05-19

- 创建 Eve & Lace 首个生产前台。
- 新增响应式首页和精选备用商品目录。
- 新增 Cloudflare Worker Static Assets 配置和自定义域名部署。

---

## English

Next.js storefront for [eveandlace.com](https://eveandlace.com).

This app exports a static multilingual storefront and deploys it to Cloudflare Worker Static Assets. The product experience is designed for adult intimate lingerie retail with restrained editorial styling, discreet service messaging, and marketplace-backed product links.

### Routes

| Route | Language |
| --- | --- |
| `/` | English |
| `/zh` | Chinese |
| `/es` | Spanish |
| `/fr` | French |

Each route uses the same storefront component in `app/storefront-page.tsx` with localized copy from `lib/i18n.ts`.

### Key Files

- `app/storefront-page.tsx` - shared storefront layout.
- `lib/i18n.ts` - language dictionaries and route metadata.
- `lib/store-data.ts` - curated fallback products, categories, and optional feed loader.
- `public/assets/eve-lace/` - storefront imagery.
- `wrangler.jsonc` - Cloudflare deployment and custom-domain route.

### Development

```bash
pnpm --filter web dev
```

Open [http://localhost:3000](http://localhost:3000).

### Quality Checks

```bash
pnpm --filter web typecheck
pnpm --filter web build
```

### Deployment

```bash
pnpm --filter web build
cd apps/web
npx wrangler deploy
```

Cloudflare serves the static export from `apps/web/out` and routes the Worker to `eveandlace.com`.

### Catalog Sync

The app first tries to read product data from `EVE_LACE_STORE_FEED_URL`. If the feed is unavailable, it falls back to local curated data.

```bash
EVE_LACE_STORE_FEED_URL=https://your-feed.example.com/eve-lace.json
```

The feed must return the `StorefrontData` JSON shape exported from `lib/store-data.ts`.

### Release Notes

#### 1.1.1 - 2026-05-19

- Converted the Web app README into a bilingual Chinese and English document.
- Added Chinese route, key file, development, quality check, deployment, and catalog sync notes.

#### 1.1.0 - 2026-05-19

- Added Chinese, Spanish, and French static routes.
- Added localized navigation, product section text, category CTAs, service copy, sync status, newsletter text, footer links, and 18+ notice.
- Added header language switcher with active-route styling.
- Verified local typecheck and production build.
- Deployed the multilingual build to Cloudflare.

#### 1.0.0 - 2026-05-19

- Created the first production storefront for Eve & Lace.
- Added responsive homepage sections and curated fallback catalog data.
- Added Cloudflare Worker Static Assets configuration and custom-domain deployment.
