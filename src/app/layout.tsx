import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'F1Store - Official Formula 1 Merchandise',
    template: '%s | F1Store',
  },
  description: 'Shop official Formula 1 team and driver merchandise. Authentic F1 apparel, accessories, and collectibles.',
  keywords: ['Formula 1', 'F1', 'merchandise', 'racing', 'team merchandise', 'driver merchandise'],
  authors: [{ name: 'F1Store' }],
  creator: 'F1Store',
  publisher: 'F1Store',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://f1store.com',
    siteName: 'F1Store',
    title: 'F1Store - Official Formula 1 Merchandise',
    description: 'Shop official Formula 1 team and driver merchandise.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'F1Store - Official Formula 1 Merchandise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'F1Store - Official Formula 1 Merchandise',
    description: 'Shop official Formula 1 team and driver merchandise.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}