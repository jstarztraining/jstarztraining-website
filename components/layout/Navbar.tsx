'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { NAV_LINKS } from '@/lib/site';
import { cn } from '@/lib/utils';

export type NavBanner = { enabled: boolean; message: string | null; url: string | null };

export function Navbar({ banner }: { banner?: NavBanner }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Pages with a dark full-bleed hero let the bar sit transparent at the top.
  const overHero = pathname === '/';
  const transparent = overHero && !scrolled && !menuOpen;

  // Promo banner: homepage only (it's the homepage hero banner, §6G).
  const showBanner = Boolean(overHero && banner?.enabled && banner.message && !menuOpen);

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
    <header className="fixed inset-x-0 top-0 z-nav">
      {/* Promo banner row — opaque gold, sits above the nav row */}
      {showBanner ? (
        <BannerRow message={banner!.message!} url={banner!.url} />
      ) : null}

      {/* Nav row — transparent over the hero, navy blur on scroll */}
      <div
        className={cn(
          'transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out-quint',
          transparent
            ? 'bg-transparent'
            // navy/90 is near-opaque, so a light blur reads the same as blur-xl
            // but costs iOS Safari far less on every scroll frame.
            : 'bg-navy/90 shadow-[0_8px_30px_-12px_rgba(6,24,63,0.7)] backdrop-blur-md',
        )}
      >
      <nav
        aria-label="Primary"
        className={cn(
          'container-px flex items-center justify-between transition-[height] duration-500 ease-out-quint',
          scrolled ? 'h-20' : 'h-24',
        )}
      >
        <Logo dark size="lg" />

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex xl:gap-9">
          {NAV_LINKS.slice(1).map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'group relative text-base font-medium text-white/85 transition-colors duration-300 hover:text-white',
                    active && 'text-white',
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute -bottom-1.5 left-0 h-0.5 w-full origin-left rounded-full bg-gold transition-transform duration-300 ease-out-quint',
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Button href="/programs" size="lg" className="hidden sm:inline-flex">
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
      </div>

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
          <Button href="/programs" size="lg" className="mt-8 w-full">
            Book a Session
          </Button>
        </nav>
      </div>
    </header>
  );
}

function BannerRow({ message, url }: { message: string; url: string | null }) {
  const content = (
    <div className="container-px flex items-center justify-center gap-2 py-2 text-center text-sm font-semibold text-navy">
      <span>{message}</span>
      {url ? <span aria-hidden>→</span> : null}
    </div>
  );
  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block bg-gold transition-colors hover:bg-gold-soft">
      {content}
    </a>
  ) : (
    <div className="bg-gold">{content}</div>
  );
}
