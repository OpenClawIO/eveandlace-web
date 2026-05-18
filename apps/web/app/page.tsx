import { formatRefreshTime, getStorefrontData } from '@/lib/store-data';

export default async function HomePage() {
  const store = await getStorefrontData();
  const heroProducts = store.products.slice(0, 7);

  return (
    <main>
      <div className="top-strip" aria-label="Store promises">
        <span>Worldwide shipping</span>
        <span>Discreet packaging · Easy returns</span>
        <span>Secure checkout</span>
      </div>

      <header className="site-header">
        <a className="brand" href="/" aria-label="Eve & Lace home">
          {store.brand}
        </a>
        <nav aria-label="Primary navigation">
          <a href="#new-in">New In</a>
          <a href="#sets">Sets</a>
          <a href="#bodysuits">Bodysuits</a>
          <a href="#fit">Size Guide</a>
          <a href="#sync">Store Sync</a>
        </nav>
        <a className="header-action" href={store.sourceUrl}>
          Visit store
        </a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <h1>Intimate pieces with a softer edge</h1>
          <p>
            Curated lingerie, lace sets, and private wardrobe essentials refreshed from our marketplace store.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#new-in">
              Shop new arrivals
            </a>
            <a className="button button-light" href={store.sourceUrl}>
              View AliExpress store
            </a>
          </div>
        </div>
        <div className="hero-media" aria-label="Eve & Lace editorial lingerie visual" />
      </section>

      <section className="product-section" id="new-in">
        <div className="section-kicker">
          <div>
            <h2>Refreshed from our store</h2>
            <p>New and updated picks</p>
          </div>
          <a href={store.sourceUrl}>View all</a>
        </div>

        <div className="product-rail">
          {heroProducts.map((product) => (
            <a className="product-card" href={product.href} key={product.id}>
              <img src={product.image} alt={product.title} />
              <span>{product.title}</span>
              <strong>{product.price}</strong>
            </a>
          ))}
        </div>
      </section>

      <section className="category-grid" aria-label="Collections">
        {store.categories.map((category) => (
          <a
            className="category-tile"
            href={category.href}
            id={category.name === 'Lingerie Sets' ? 'sets' : category.name === 'Bodysuits' ? 'bodysuits' : undefined}
            key={category.name}
            style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.72), rgba(0,0,0,.18)), url(${category.image})` }}
          >
            <span>{category.name}</span>
            <strong>{category.cta}</strong>
          </a>
        ))}
      </section>

      <section className="service-grid" id="fit">
        <article>
          <span className="line-icon">◎</span>
          <h3>Quality you can feel</h3>
          <p>Carefully selected fabrics and thoughtful details for daily confidence.</p>
        </article>
        <article>
          <span className="line-icon">⌁</span>
          <h3>Find your fit</h3>
          <p>Inclusive sizing notes and a clear fit guide before you order.</p>
        </article>
        <article>
          <span className="line-icon">□</span>
          <h3>Discreet by design</h3>
          <p>Plain packaging and private checkout details for peace of mind.</p>
        </article>
        <article>
          <span className="line-icon">◇</span>
          <h3>Secure & private</h3>
          <p>Checkout routes through trusted marketplace infrastructure.</p>
        </article>
      </section>

      <section className="lower-grid">
        <article className="sync-card" id="sync">
          <div className="sync-mark" aria-hidden="true">↻</div>
          <div>
            <h2>Store sync status</h2>
            <p>Last refresh: {formatRefreshTime(store.lastRefreshed)}</p>
            <p>Source: AliExpress Store <a href={store.sourceUrl}>{store.storeId}</a></p>
            <p className="sync-note">
              Product data is loaded through the storefront data layer, so the page can refresh as your marketplace catalog changes.
            </p>
          </div>
          <a className="button button-light" href={store.sourceUrl}>View source store</a>
        </article>

        <article className="newsletter">
          <h2>Stay in the know</h2>
          <p>New arrivals, exclusive offers, and fit notes sent quietly to your inbox.</p>
          <form>
            <input aria-label="Email address" placeholder="Your email address" type="email" />
            <button type="submit">Subscribe</button>
          </form>
          <span>We respect your privacy.</span>
        </article>
      </section>

      <footer className="site-footer">
        <div>
          <a className="brand" href="/">{store.brand}</a>
          <p>Intimate pieces with a softer edge.</p>
        </div>
        <div>
          <h3>Shop</h3>
          <a href="#new-in">New In</a>
          <a href="#sets">Sets</a>
          <a href="#bodysuits">Bodysuits</a>
        </div>
        <div>
          <h3>Help</h3>
          <a href="#fit">Size Guide</a>
          <a href={store.sourceUrl}>Shipping & Delivery</a>
          <a href={store.sourceUrl}>Returns & Exchanges</a>
        </div>
        <div className="age-note">
          <strong>18+</strong>
          <p>18+ Only. This site sells adult products. By entering, you confirm you are 18 years of age or older.</p>
        </div>
      </footer>
    </main>
  );
}
