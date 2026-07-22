import type { MetadataRoute } from 'next';
import { NAV_LINKS } from '@/lib/site';
import { getSiteSettings } from '@/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://jstarztraining.com';

  // Don't advertise the Sponsors page until the section is switched on.
  const settings = await getSiteSettings();
  const links = settings?.sponsorsEnabled
    ? NAV_LINKS
    : NAV_LINKS.filter((l) => l.href !== '/sponsors');

  return links.map((link) => ({
    url: `${base}${link.href === '/' ? '' : link.href}`,
    changeFrequency: 'weekly',
    priority: link.href === '/' ? 1 : 0.7,
  }));
}
