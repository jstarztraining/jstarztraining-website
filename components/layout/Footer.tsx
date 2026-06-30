import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Container } from '@/components/ui/Container';
import { NAV_LINKS, SITE } from '@/lib/site';
import { getSiteSettings } from '@/lib/queries';

const exploreLinks = NAV_LINKS.filter((l) =>
  ['/programs', '/schedule', '/about', '/coaches'].includes(l.href),
);
const moreLinks = NAV_LINKS.filter((l) =>
  ['/testimonials', '/gallery', '/faq', '/contact'].includes(l.href),
);

const defaultAddress = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postal}`;

// Real brand glyphs (was: 2-letter text, which read unfinished). 18px, currentColor.
const ICON_CLS = 'h-[18px] w-[18px]';
const SOCIAL_ICONS: Record<string, JSX.Element> = {
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={ICON_CLS} aria-hidden focusable="false">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={ICON_CLS} aria-hidden focusable="false">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={ICON_CLS} aria-hidden focusable="false">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
};

export async function Footer() {
  // Editable via the Site Settings dashboard module; fall back to SITE config.
  const settings = await getSiteSettings();

  const email = settings?.email || SITE.email;
  const phone = settings?.phone || SITE.phone;
  const phoneHref = phone ? `tel:${phone.replace(/[^0-9+]/g, '')}` : SITE.phoneHref;
  const address = settings?.address || defaultAddress;
  const tagline = settings?.footerText || 'No ego. No politics. Just soccer.';

  const social = (
    [
      ['Instagram', settings?.instagram || SITE.social.instagram],
      ['Facebook', settings?.facebook || SITE.social.facebook],
      ['TikTok', settings?.tiktok || SITE.social.tiktok],
    ] as const
  ).filter(([, url]) => Boolean(url)) as [string, string][];

  return (
    <footer className="relative overflow-hidden bg-navy text-white/80">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-brand/30 blur-[120px]"
      />
      {/* max-sm:pb-28 reserves room so the fixed MobileBookBar never covers the
          footer's last row on phones. */}
      <Container className="relative py-16 max-sm:pb-28 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
              Private &amp; small-group soccer and goalkeeper training across Halifax &amp; Nova
              Scotia. {tagline}
            </p>
            <div className="mt-6 flex gap-3">
              {social.map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`JStarz on ${name}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-navy"
                >
                  {SOCIAL_ICONS[name] ?? name.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Explore" links={exploreLinks} />
          <FooterCol title="More" links={moreLinks} />

          <div>
            <h2 className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-gold-soft">
              Get in touch
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {email ? (
                <li>
                  <a href={`mailto:${email}`} className="transition-colors hover:text-gold">
                    {email}
                  </a>
                </li>
              ) : null}
              {phone ? (
                <li>
                  <a href={phoneHref} className="transition-colors hover:text-gold">
                    {phone}
                  </a>
                </li>
              ) : null}
              {address ? <li className="text-white/65">{address}</li> : null}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-gold-soft">
        {title}
      </h2>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition-colors hover:text-gold">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
