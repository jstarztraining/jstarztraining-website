// Single source for site-wide settings + nav. Mirrors the SiteSettings singleton
// that the dashboard will own once Supabase/Prisma is wired (placeholder for now).

export const SITE = {
  name: 'JStarz Training',
  legalName: 'JStarz Private Soccer Training',
  tagline: 'Private & small-group soccer training in Halifax, NS.',
  email: 'jstarz@jstarztraining.com',
  phone: '(782) 821-2300',
  phoneHref: 'tel:+17828212300',
  address: {
    street: '313-680 Parkland Drive',
    city: 'Halifax',
    region: 'NS',
    postal: 'B3S 1M5',
    country: 'Canada',
  },
  registry: 'NS Registry ID 4643639',
  // Site never handles money — every booking path links OUT to the Shopify store.
  // Programs link to per-collection paths off this base (see lib/content.ts).
  shopifyStoreUrl: 'https://jstarztraining.myshopify.com',
  social: {
    instagram: 'https://www.instagram.com/jstarz_t',
    facebook: 'https://www.facebook.com/share/1DDCjDFQTV/',
    // TikTok unconfirmed by Jordan — placeholder; remove if no account exists.
    tiktok: 'https://tiktok.com/@jstarztraining',
  },
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Programs', href: '/programs' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'About', href: '/about' },
  { label: 'Coaches', href: '/coaches' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const;
