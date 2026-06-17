'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { Navbar } from './Navbar';

/**
 * Renders the public navbar + footer around page content, but omits them on the
 * admin dashboard and login. The footer is passed in (it's an async server
 * component that reads Site Settings), so this client component just gates it.
 */
export function SiteChrome({ children, footer }: { children: ReactNode; footer: ReactNode }) {
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
      {!bare && footer}
    </>
  );
}
