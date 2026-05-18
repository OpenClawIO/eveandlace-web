import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Eve & Lace | Intimate Apparel Boutique',
  description: 'Eve & Lace independent storefront for elegant lingerie, lace sets, bodysuits, robes, and private wardrobe essentials.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
