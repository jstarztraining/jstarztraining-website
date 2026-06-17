import 'server-only';
import { cache } from 'react';
import { prisma } from './prisma';

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
