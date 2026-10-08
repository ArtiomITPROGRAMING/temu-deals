import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DealFinder — Поиск максимальных скидок и анализ реальной выгоды Temu',
  description:
    'DealFinder помогает найти настоящие скидки в Temu и маркетплейсах, сравнивает 90-дневную историю цен и выявляет реальную выгоду без накруток.',
  keywords: [
    'скидки',
    'Temu',
    'распродажи',
    'сравнение цен',
    'история цен',
    'реальная выгода',
    'дешевые товары',
    'выкуп temu',
  ],
  authors: [{ name: 'DealFinder' }],
  verification: {
    google: '_yW9BJYp-dOtlAgUieserUf6osdLcGYMYfUUjqSLjb4',
  },
  openGraph: {
    type: 'website',
    url: 'https://dealfinder-deals.web.app/',
    title: 'DealFinder — Умный поиск максимальных скидок и честных цен в Temu',
    description:
      'Сравниваем цены, анализируем 90-дневную историю цен в Temu и собираем товары в единую корзину.',
    siteName: 'DealFinder',
    locale: 'ru_RU',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200',
        width: 1200,
        height: 630,
        alt: 'DealFinder Temu Deals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DealFinder — Анализ реальных скидок в Temu',
    description: 'Умный поиск реальной выгоды без искусственно завышенных цен.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#FB7701',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F8F9FA] text-[#1E293B] antialiased selection:bg-amber-500 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
