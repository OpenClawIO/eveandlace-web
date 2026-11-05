'use client';

import { useEffect, useMemo, useState } from 'react';

import { dictionaries, localizeCategory, locales, localizeProduct, type Locale } from '@/lib/i18n';
import { formatRefreshTime, type StorefrontData } from '@/lib/store-data';

type StorefrontClientProps = {
  initialStore: StorefrontData;
  locale: Locale;
};

export function StorefrontClient({ initialStore, locale }: StorefrontClientProps) {
  const [store, setStore] = useState(initialStore);
  const t = dictionaries[locale];

  useEffect(() => {
    if (window.location.hostname !== 'eveandlace.com') {
      return;
    }

    let active = true;

    fetch('/api/storefront-data', {
      headers: { Accept: 'application/json' }
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: StorefrontData | null) => {
        if (active && payload?.products?.length) {
          setStore(payload);
        }
      })
      .catch(() => {
        // Keep the build-time fallback when the background sync endpoint is unavailable.
      });

    return () => {
      active = false;
    };
  }, []);

  const listedProducts = useMemo(
    () => store.products.map((product) => localizeProduct(product, locale)),
    [store.products, locale]
  );
  const categories = useMemo(() => store.categories.map((category) => localizeCategory(category, locale)), [store.categories, locale]);

  return (
    <main>
      <div className="top-strip" aria-label="Store promises">
        {t.topStrip.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <header className="site-header">
        <a className="brand" href={locale === 'en' ? '/' : `/${locale}`} aria-label="Eve & Lace home">
          <img
            className="brand-logo brand-logo-header"
            src="/assets/eve-lace/logo-mark-20260601.webp"
            alt={store.brand}
            width="180"
            height="180"
          />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#new-in">{t.nav.newIn}</a>
          <a href="#sets">{t.nav.sets}</a>
          <a href="#bodysuits">{t.nav.bodysuits}</a>
          <a href="#fit">{t.nav.sizeGuide}</a>
          <a href="#sync">{t.nav.storeSync}</a>
        </nav>
        <div className="header-tools">
          <div className="language-switcher" aria-label="Language selector">
            {locales.map((item) => (
              <a className={item.code === locale ? 'active' : undefined} href={item.href} key={item.code} hrefLang={item.code}>
                {item.label}
              </a>
            ))}
          </div>
          <a className="header-action" href={store.sourceUrl} target="_blank" rel="noopener noreferrer sponsored">
            {t.headerAction}
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroCopy}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#new-in">
              {t.shopNew}
            </a>
            <a className="button button-light" href={store.sourceUrl} target="_blank" rel="noopener noreferrer sponsored">
              {t.viewStore}
            </a>
          </div>
        </div>
        <div className="hero-media">
          <picture>
            <source srcSet="/assets/eve-lace/hero.avif" type="image/avif" />
            <img
              src="/assets/eve-lace/hero.webp"
              alt="Eve & Lace editorial collection"
              width="920"
              height="345"
              fetchPriority="high"
            />
          </picture>
        </div>
      </section>

      <section className="product-section" id="new-in">
        <div className="section-kicker">
          <div>
            <h2>{t.refreshedTitle}</h2>
            <p>{t.refreshedSub}</p>
            <p className="product-count">
              {t.productCount}: {listedProducts.length}
            </p>
          </div>
          <a href={store.sourceUrl} target="_blank" rel="noopener noreferrer sponsored">{t.viewAll}</a>
        </div>

        <div className="product-rail">
          {listedProducts.map((product) => {
            const hasDirectLink = product.href !== store.sourceUrl;
            const content = (
              <>
                <div className="product-image-frame">
                  <img src={product.image} alt={product.title} width="147" height="180" loading="lazy" />
                </div>
                <span>{product.title}</span>
                <strong>{product.price}</strong>
              </>
            );

            return hasDirectLink ? (
              <a
                className="product-card"
                href={product.href}
                key={product.id}
                target="_blank"
                rel="noopener noreferrer sponsored"
              >
                {content}
              </a>
            ) : (
              <article className="product-card" key={product.id}>{content}</article>
            );
          })}
        </div>
      </section>

      <section className="category-grid" aria-label="Collections">
        {categories.map((category) => (
          <a
            className="category-tile"
            href={category.href}
            id={category.id === 'sets' || category.id === 'bodysuits' ? category.id : undefined}
            key={category.id}
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.72), rgba(0,0,0,.18)), url(${category.image})` }}
          >
            <span>{category.name}</span>
            <strong>{category.cta}</strong>
          </a>
        ))}
      </section>

      <section className="service-grid" id="fit">
        {t.services.map(([title, body], index) => (
          <article key={title}>
            <span className="line-icon">{['◎', '⌁', '□', '◇'][index]}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="lower-grid">
        <article className="sync-card" id="sync">
          <div className="sync-mark" aria-hidden="true">↻</div>
          <div>
            <h2>{t.syncTitle}</h2>
            <p>
              {t.lastRefresh}: {formatRefreshTime(store.lastRefreshed, locale)}
            </p>
            <p>
              {t.source}: AliExpress Store <a href={store.sourceUrl}>{store.storeId}</a>
            </p>
            <p className="sync-note">
              {store.syncStatus?.source === 'fallback' ? t.fallbackNotice : t.syncCopy}
            </p>
          </div>
          <a className="button button-light" href={store.sourceUrl} target="_blank" rel="noopener noreferrer sponsored">
            {t.viewSource}
          </a>
        </article>
      </section>

      <footer className="site-footer">
        <div>
          <a className="brand" href={locale === 'en' ? '/' : `/${locale}`}>
            <img
              className="brand-logo brand-logo-footer"
              src="/assets/eve-lace/logo-mark-20260601.webp"
              alt={store.brand}
              width="180"
              height="180"
              loading="lazy"
            />
          </a>
          <p>{t.footerTagline}</p>
        </div>
        <div>
          <h3>{t.footerShop}</h3>
          <a href="#new-in">{t.nav.newIn}</a>
          <a href="#sets">{t.nav.sets}</a>
          <a href="#bodysuits">{t.nav.bodysuits}</a>
        </div>
        <div className="marketplace-note">
          <h3>{t.beforeOrderTitle}</h3>
          <p>{t.beforeOrderCopy}</p>
          <a href={store.sourceUrl} target="_blank" rel="noopener noreferrer sponsored">{t.viewSource}</a>
        </div>
        <div className="age-note">
          <strong>18+</strong>
          <p>{t.ageNote}</p>
        </div>
      </footer>
    </main>
  );
}
