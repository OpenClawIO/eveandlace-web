import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Eve & Lace | Intimate Apparel Boutique',
  description: 'Eve & Lace independent storefront for elegant lingerie, lace sets, bodysuits, robes, and private wardrobe essentials.',
  icons: {
    icon: [
      {
        url: '/favicon.png',
        type: 'image/png',
        sizes: '192x192'
      }
    ],
    apple: [
      {
        url: '/favicon.png',
        type: 'image/png',
        sizes: '192x192'
      }
    ]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
