import type { Metadata, Viewport } from 'next';
import { Inter, Anton } from 'next/font/google';
import { AppShell } from '@/components/layout/AppShell';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://f1store.com'),
  title: {
    default: 'F1Store - Official Formula 1 Merchandise',
    template: '%s | F1Store',
  },
  description: 'Shop official Formula 1 team and driver merchandise. Authentic F1 apparel, accessories, and collectibles from top constructors.',
  keywords: ['Formula 1', 'F1', 'merchandise', 'racing', 'team merchandise', 'driver merchandise', 'F1 apparel', 'F1 collectibles'],
  authors: [{ name: 'F1Store' }],
  creator: 'F1Store',
  publisher: 'F1Store',
  robots: 'index, follow',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  alternates: {
    canonical: 'https://f1store.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://f1store.com',
    siteName: 'F1Store',
    title: 'F1Store - Official Formula 1 Merchandise',
    description: 'Shop official Formula 1 team and driver merchandise. Authentic F1 apparel, accessories, and collectibles.',
    images: [
      {
        url: 'https://f1store.com/icon.png',
        width: 800,
        height: 800,
        alt: 'F1Store - Official Formula 1 Merchandise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'F1Store - Official Formula 1 Merchandise',
    description: 'Shop official Formula 1 team and driver merchandise. Authentic F1 apparel, accessories, and collectibles.',
    images: ['https://f1store.com/icon.png'],
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
    <html lang="en" className={`${inter.variable} ${anton.variable} antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="flex min-h-screen flex-col bg-[#0b0e14]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'F1Store',
              url: 'https://f1store.com',
              logo: 'https://f1store.com/icon.png',
              description: 'Official Formula 1 merchandise store. Authentic F1 apparel, accessories, and collectibles.',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'F1Store',
              url: 'https://f1store.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://f1store.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://f1store.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Sign In',
                  item: 'https://f1store.com/login',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Create Account',
                  item: 'https://f1store.com/register',
                },
              ],
            }),
          }}
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
