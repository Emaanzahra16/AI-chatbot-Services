import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { siteConfig } from '@/lib/site-config';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingChatbot } from '@/components/chatbot/floating-chatbot';
import { TermsModal } from '@/components/terms-modal';
import './globals.css';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const mono = Inter({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

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
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <head>
        {/* Google Translate Script */}
        <script
          type="text/javascript"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          async
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,es,fr,de,it,pt,ru,zh,ja,ko,ar,hi',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `,
          }}
        />
        {/* Hide ALL Google Translate UI elements */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Hide all Google Translate UI elements */
            .goog-te-banner-frame.skiptranslate,
            .goog-te-gadget-simple,
            .goog-te-gadget,
            .goog-te-banner-frame,
            .goog-te-menu-frame,
            .goog-te-common,
            .skiptranslate,
            #google_translate_element,
            .goog-te-gadget-icon,
            .goog-tooltip,
            .goog-tooltip:hover,
            .goog-text-highlight {
              display: none !important;
              visibility: hidden !important;
            }
            
            /* Remove the iframe that causes the white bar */
            iframe.skiptranslate {
              display: none !important;
              visibility: hidden !important;
            }
            
            /* Keep body at top */
            body {
              top: 0px !important;
              position: relative !important;
            }
            
            /* Prevent any extra spacing at top */
            html {
              margin-top: 0px !important;
            }
          `
        }} />
      </head>
      <body className="min-h-screen overflow-x-hidden noise antialiased">
        {/* Hidden div for Google Translate */}
        <div id="google_translate_element" style={{ display: 'none' }} />
        
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <div className="pointer-events-none fixed inset-0 -z-10 bg-grid opacity-40" aria-hidden />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <FloatingChatbot />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: 'rgba(12, 14, 36, 0.9)',
              color: '#eef0f7',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              backdropFilter: 'blur(12px)',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#22d3ee', secondary: '#06081a' } },
            error: { iconTheme: { primary: '#f87171', secondary: '#06081a' } },
          }}
        />
        <TermsModal />
      </body>
    </html>
  );
}