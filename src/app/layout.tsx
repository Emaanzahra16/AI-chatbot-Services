import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import { siteConfig } from '@/lib/site-config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingChatbot } from '@/components/chatbot/floating-chatbot';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';
import './globals.css';

const GoogleTranslateLoader = dynamic(
  () => import('@/components/GoogleTranslateLoader'),
  { ssr: false }
);

const sans    = Inter({ subsets: ['latin'], variable: '--font-sans',    display: 'swap' });
const display = Instrument_Serif({ weight: '400', subsets: ['latin'], variable: '--font-display', display: 'swap' });
const mono    = Inter({ subsets: ['latin'], variable: '--font-mono',    display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#06081a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  applicationName: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Tu negocio, potenciado por IA`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.twitter,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/favicon-512.png',
    shortcut: '/favicon.ico',
  },
};

// Add your GA4 Measurement ID to Vercel env vars as NEXT_PUBLIC_GA_ID
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sans.variable} ${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* ── Google Analytics 4 ────────────────────────────────────────── */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </head>

      <body className="min-h-screen overflow-x-hidden noise antialiased" suppressHydrationWarning>
        <GoogleTranslateLoader />

        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-white">
          Saltar al contenido
        </a>

        <div className="pointer-events-none fixed inset-0 -z-10 bg-grid opacity-40" aria-hidden />

        <Navbar />
        <main id="main">{children}</main>
        <Footer />

        <FloatingChatbot />
        <WhatsAppWidget />

        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: 'rgba(12,14,36,0.9)', color: '#eef0f7',
              border: '1px solid rgba(139,92,246,0.3)', backdropFilter: 'blur(12px)',
              borderRadius: '12px', padding: '12px 16px', fontSize: '14px',
            },
            success: { iconTheme: { primary: '#22d3ee', secondary: '#06081a' } },
            error:   { iconTheme: { primary: '#f87171', secondary: '#06081a' } },
          }}
        />
      </body>
    </html>
  );
}
