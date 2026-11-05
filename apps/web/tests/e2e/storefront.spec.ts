import { expect, test } from '@playwright/test';

const locales = [
  { path: '/', lang: 'en', dir: 'ltr', heading: 'Intimate pieces with a softer edge' },
  { path: '/zh', lang: 'zh-CN', dir: 'ltr', heading: '柔和质感的私密衣橱' },
  { path: '/es', lang: 'es', dir: 'ltr', heading: 'Prendas íntimas con un toque más suave' },
  { path: '/fr', lang: 'fr', dir: 'ltr', heading: 'Des pièces intimes au toucher plus doux' },
  { path: '/ar', lang: 'ar', dir: 'rtl', heading: 'قطع حميمة بلمسة أكثر نعومة' }
] as const;

for (const locale of locales) {
  test(`${locale.path} has localized document metadata`, async ({ page }) => {
    await page.goto(locale.path);
    await expect(page.locator('html')).toHaveAttribute('lang', locale.lang);
    await expect(page.locator('html')).toHaveAttribute('dir', locale.dir);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(locale.heading);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(6);
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
    await expect(page.locator('form')).toHaveCount(0);
  });
}

test('ships crawl metadata and a real 404', async ({ request }) => {
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('Sitemap: https://eveandlace.com/sitemap.xml');

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain('https://eveandlace.com/zh');

  const missing = await request.get('/does-not-exist');
  expect(missing.status()).toBe(404);
});

test('uses explicit responsive image dimensions', async ({ page }) => {
  await page.goto('/');
  const hero = page.locator('.hero-media img');
  await expect(hero).toHaveAttribute('width', '920');
  await expect(hero).toHaveAttribute('height', '345');
  await expect(page.locator('.product-card img').first()).toHaveAttribute('width', '147');
  await expect(page.locator('.product-card img').first()).toHaveAttribute('height', '180');
});
