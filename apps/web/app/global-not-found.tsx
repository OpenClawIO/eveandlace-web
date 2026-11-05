import './globals.css';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="not-found-shell">
          <p className="not-found-code">404</p>
          <h1>Page not found</h1>
          <p>The page you requested does not exist.</p>
          <a className="button button-dark" href="/">Return to Eve & Lace</a>
        </main>
      </body>
    </html>
  );
}
