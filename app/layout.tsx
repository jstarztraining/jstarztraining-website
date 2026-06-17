import type { Metadata } from 'next';
import { fontVariables } from '@/lib/fonts';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SITE } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://jstarztraining.com'),
  title: {
    default: 'JStarz Training — Private Soccer Training in Halifax, NS',
    template: '%s · JStarz Training',
  },
  description:
    'Private and small-group soccer and goalkeeper training in Halifax, NS. One-on-one coaching, 4–6 player groups, all ages and backgrounds welcome. No ego. No politics. Just soccer.',
  keywords: [
    'private soccer training Halifax',
    'goalkeeper training Halifax',
    'small group soccer training Nova Scotia',
    'youth soccer development Halifax',
    'BMO Soccer Centre training',
  ],
  authors: [{ name: SITE.legalName }],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: SITE.name,
    title: 'JStarz Training — Private Soccer Training in Halifax, NS',
    description:
      'Private and small-group soccer and goalkeeper training in Halifax, NS. More touches, real coaching, a community that feels like family.',
    url: 'https://jstarztraining.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JStarz Training — Private Soccer Training in Halifax, NS',
    description:
      'Private and small-group soccer and goalkeeper training in Halifax, NS. More touches, real coaching, a community that feels like family.',
  },
  robots: { index: true, follow: true },
};

// Pre-paint: arm scroll-reveal only when JS runs and motion is allowed, so
// content is never hidden on no-JS, headless, or reduced-motion renders.
const revealReadyScript = `(function(){try{if(!window.matchMedia||!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('reveal-ready');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: revealReadyScript }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-toast focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:font-heading focus:font-semibold focus:text-navy"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
