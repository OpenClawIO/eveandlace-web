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
    <main dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale}>
      <div className="top-strip" aria-label="Store promises">
        {t.topStrip.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <header className="site-header">
        <a className="brand" href={locale === 'en' ? '/' : `/${locale}`} aria-label="Eve & Lace home">
          <img className="brand-logo brand-logo-header" src="/assets/eve-lace/logo-mark.png" alt={store.brand} />
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
          <a className="header-action" href={store.sourceUrl}>
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
            <a className="button button-light" href={store.sourceUrl}>
              {t.viewStore}
            </a>
          </div>
        </div>
        <div className="hero-media" aria-label="Eve & Lace editorial lingerie visual" />
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
          <a href={store.sourceUrl}>{t.viewAll}</a>
        </div>

        <div className="product-rail">
          {listedProducts.map((product) => (
            <a className="product-card" href={product.href} key={product.id}>
              <img src={product.image} alt={product.title} />
              <span>{product.title}</span>
              <strong>{product.price}</strong>
            </a>
          ))}
        </div>
      </section>

      <section className="category-grid" aria-label="Collections">
        {categories.map((category) => (
          <a
            className="category-tile"
            href={category.href}
            id={category.id === 'sets' || category.id === 'bodysuits' ? category.id : undefined}
            key={category.id}
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
            <p className="sync-note">{t.syncCopy}</p>
          </div>
          <a className="button button-light" href={store.sourceUrl}>
            {t.viewSource}
          </a>
        </article>

        <article className="newsletter">
          <h2>{t.newsletterTitle}</h2>
          <p>{t.newsletterCopy}</p>
          <form>
            <input aria-label="Email address" placeholder={t.emailPlaceholder} type="email" />
            <button type="submit">{t.subscribe}</button>
          </form>
          <span>{t.privacy}</span>
        </article>
      </section>

      <footer className="site-footer">
        <div>
          <a className="brand" href={locale === 'en' ? '/' : `/${locale}`}>
            <img className="brand-logo brand-logo-footer" src="/assets/eve-lace/logo-mark.png" alt={store.brand} />
          </a>
          <p>{t.footerTagline}</p>
        </div>
        <div>
          <h3>{t.footerShop}</h3>
          <a href="#new-in">{t.nav.newIn}</a>
          <a href="#sets">{t.nav.sets}</a>
          <a href="#bodysuits">{t.nav.bodysuits}</a>
        </div>
        <div>
          <h3>{t.footerHelp}</h3>
          <a href="#fit">{t.nav.sizeGuide}</a>
          <a href={store.sourceUrl}>{t.shipping}</a>
          <a href={store.sourceUrl}>{t.returns}</a>
        </div>
        <div className="contact-info">
          <h3>{t.contactTitle}</h3>
          <a href={`mailto:${t.contactEmail}`}>{t.contactEmail}</a>
          <a href={`tel:${t.contactTel.replaceAll(' ', '')}`}>{t.contactTel}</a>
          <span>{t.contactLocation}</span>
        </div>
        <div className="age-note">
          <strong>18+</strong>
          <p>{t.ageNote}</p>
        </div>
      </footer>
    </main>
  );
}
