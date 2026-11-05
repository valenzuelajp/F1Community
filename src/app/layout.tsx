import type { Metadata, Viewport } from 'next';
import { Inter, Anton, Barlow_Condensed, Barlow, Space_Grotesk, Space_Mono } from 'next/font/google';
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

/* Pit-wall theme faces (home + content pages; auth pages keep Inter). */
const pitDisplay = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  style: 'italic',
  variable: '--font-pit-display',
  display: 'swap',
});

const pitBody = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-pit-body',
  display: 'swap',
});

/* Maximalist re-skin faces (new system; Anton above doubles as display). */
const maxBody = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-max-body',
  display: 'swap',
});

const maxMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-max-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://f1store.com'),
  title: {
    default: 'F1 Store - Official Formula 1 Merchandise',
    template: '%s | F1 Store',
  },
  description: 'Shop official Formula 1 team and driver merchandise. Authentic F1 apparel, accessories, and collectibles from top constructors.',
  keywords: ['Formula 1', 'F1', 'merchandise', 'racing', 'team merchandise', 'driver merchandise', 'F1 apparel', 'F1 collectibles'],
  authors: [{ name: 'F1 Store' }],
  creator: 'F1 Store',
  publisher: 'F1 Store',
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
    siteName: 'F1 Store',
    title: 'F1 Store - Official Formula 1 Merchandise',
    description: 'Shop official Formula 1 team and driver merchandise. Authentic F1 apparel, accessories, and collectibles.',
    images: [
      {
        url: 'https://f1store.com/icon.png',
        width: 800,
        height: 800,
        alt: 'F1 Store - Official Formula 1 Merchandise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'F1 Store - Official Formula 1 Merchandise',
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
    <html lang="en" className={`${inter.variable} ${anton.variable} ${pitDisplay.variable} ${pitBody.variable} ${maxBody.variable} ${maxMono.variable} antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="flex min-h-screen flex-col bg-pit-carbon">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'F1 Store',
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
              name: 'F1 Store',
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
