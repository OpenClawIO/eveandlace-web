import type { Locale } from '@/lib/i18n';

export function RootDocument({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  return (
    <html lang={locale === 'zh' ? 'zh-CN' : locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>{children}</body>
    </html>
  );
}
