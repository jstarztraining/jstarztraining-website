'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

/**
 * Renders the public navbar + footer around page content, but omits them on the
 * admin dashboard and login (those surfaces have their own chrome / none).
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname.startsWith('/admin') || pathname.startsWith('/login');

  return (
    <>
      {!bare && (
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-toast focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:font-heading focus:font-semibold focus:text-navy"
        >
          Skip to content
        </a>
      )}
      {!bare && <Navbar />}
      <main id="main">{children}</main>
      {!bare && <Footer />}
    </>
  );
}
