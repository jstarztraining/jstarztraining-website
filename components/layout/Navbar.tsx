'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { NAV_LINKS, SITE } from '@/lib/site';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Pages with a dark full-bleed hero let the bar sit transparent at the top.
  const overHero = pathname === '/';
  const transparent = overHero && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close the menu on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-nav transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out-quint',
        transparent
          ? 'bg-transparent'
          : 'bg-navy/85 shadow-[0_8px_30px_-12px_rgba(6,24,63,0.7)] backdrop-blur-xl',
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          'container-px flex items-center justify-between transition-[height] duration-500 ease-out-quint',
          scrolled ? 'h-16' : 'h-20',
        )}
      >
        <Logo dark />

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.slice(1).map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'group relative text-sm font-medium text-white/85 transition-colors duration-300 hover:text-white',
                    active && 'text-white',
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-gold transition-all duration-300 ease-out-quint',
                      active ? 'w-full' : 'w-0 group-hover:w-full',
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Button href={SITE.shopifyStoreUrl} size="md" className="hidden sm:inline-flex">
            Book Now
          </Button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-4 w-5">
              <span
                className={cn(
                  'absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ease-out-quint',
                  menuOpen ? 'top-1.5 rotate-45' : 'top-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-1.5 h-0.5 w-5 rounded bg-current transition-all duration-300',
                  menuOpen && 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ease-out-quint',
                  menuOpen ? 'top-1.5 -rotate-45' : 'top-3',
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className={cn(
          'fixed inset-0 top-0 z-nav-menu flex flex-col bg-navy/98 backdrop-blur-xl transition-[opacity,visibility] duration-300 lg:hidden',
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <div className="container-px flex h-20 items-center justify-between">
          <Logo dark />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-2xl text-white transition-colors hover:border-gold hover:text-gold"
          >
            <span aria-hidden>×</span>
          </button>
        </div>
        <nav aria-label="Mobile" className="container-px flex flex-1 flex-col justify-center gap-1 pb-24">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'border-b border-white/10 py-4 font-heading text-2xl font-semibold tracking-tight transition-all duration-500 ease-out-quint',
                menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0',
                pathname === link.href ? 'text-gold' : 'text-white hover:text-gold',
              )}
              style={{ transitionDelay: menuOpen ? `${100 + i * 45}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}
          <Button href={SITE.shopifyStoreUrl} size="lg" className="mt-8 w-full">
            Book a Session
          </Button>
        </nav>
      </div>
    </header>
  );
}
