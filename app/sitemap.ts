import type { MetadataRoute } from 'next';
import { NAV_LINKS } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://jstarztraining.com';
  return NAV_LINKS.map((link) => ({
    url: `${base}${link.href === '/' ? '' : link.href}`,
    changeFrequency: 'weekly',
    priority: link.href === '/' ? 1 : 0.7,
  }));
}
