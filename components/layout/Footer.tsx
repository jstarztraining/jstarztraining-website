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
      <Container className="relative py-16 lg:py-20">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xs font-semibold uppercase tracking-wide text-white/70 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy"
                >
                  {name.slice(0, 2)}
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

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {2026} {SITE.legalName}. All rights reserved.
          </p>
          <p>{SITE.registry}</p>
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
