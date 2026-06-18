import 'server-only';
import { cache } from 'react';
import { prisma } from './prisma';
import { getPageDef } from './content-blocks';

// Editable page text: returns an accessor `(key) => value` where a saved
// ContentBlock overrides the registry default. Use on pages registered in
// content-blocks.ts.
export const getPageContent = cache(async (slug: string) => {
  const def = getPageDef(slug);
  const page = await prisma.page.findUnique({ where: { slug }, include: { blocks: true } });
  const dbMap = new Map((page?.blocks ?? []).map((b) => [b.key, b.value]));

  return (key: string): string => {
    const v = dbMap.get(key);
    if (v !== undefined && v !== '') return v;
    return def?.blocks.find((b) => b.key === key)?.default ?? '';
  };
});

// Cached per-request reads from the DB the dashboard writes to. Page-level
// `export const revalidate = 60` (ISR) controls how often these re-run in prod.

export const getHomeHero = cache(() =>
  prisma.homeHero.findUnique({ where: { id: 'singleton' } }),
);

export const getSiteSettings = cache(() =>
  prisma.siteSettings.findUnique({ where: { id: 'singleton' } }),
);

export const getActivePrograms = cache(() =>
  prisma.program.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  }),
);

export const getActiveTestimonials = cache(() =>
  prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  }),
);

export const getActiveCoaches = cache(() =>
  prisma.coach.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  }),
);

export const getActiveFaqs = cache(() =>
  prisma.faqItem.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  }),
);

export const getSessions = cache(() =>
  prisma.session.findMany({ orderBy: { startsAt: 'asc' } }),
);
