import { PrismaClient } from '@prisma/client';
import { PROGRAMS, TESTIMONIALS, COACHES, GALLERY } from '../lib/content';
import { SITE } from '../lib/site';

const prisma = new PrismaClient();

/* The 9 locked pages (§4). */
const PAGES = [
  { slug: 'home', title: 'Home' },
  { slug: 'about', title: 'About' },
  { slug: 'programs', title: 'Programs' },
  { slug: 'schedule', title: 'Schedule' },
  { slug: 'gallery', title: 'Gallery' },
  { slug: 'testimonials', title: 'Testimonials' },
  { slug: 'coaches', title: 'Coaches & Staff' },
  { slug: 'faq', title: 'FAQ' },
  { slug: 'contact', title: 'Contact' },
];

/* FAQ (§10 — ready list; cancellation policy still outstanding from Jordan). */
const FAQS = [
  {
    question: 'What ages do you train?',
    answer:
      'Everyone from age 6 through U18, plus adult private clients. Group development programs are organized by age band; private sessions are tailored to any age and level.',
  },
  {
    question: 'How big are the groups?',
    answer:
      'Small by design — a maximum of 4–6 players per group. That means more touches on the ball and real, individual coaching every session.',
  },
  {
    question: 'Where do you train?',
    answer:
      'BMO Soccer Centre, NDO Fitness Gym, and Sandy Lake Academy Gym indoors, plus outdoor venues through the summer.',
  },
  {
    question: 'What’s the difference between private and group training?',
    answer:
      'Private sessions are one-on-one (or very small) and built entirely around your goals. Group programs develop players together in a small-group setting with a focused curriculum.',
  },
  {
    question: 'Are you affiliated with a specific club?',
    answer:
      'No — we’re proudly club-neutral. All teams and all backgrounds are welcome. We develop the player in front of us.',
  },
  {
    question: 'Do you specialize in goalkeeping?',
    answer:
      'Yes. We run dedicated goalkeeper development from grassroots through U18 — handling, footwork, shot-stopping, and distribution coached properly.',
  },
  {
    question: 'How do I register?',
    answer:
      'Browse our programs and book straight through our secure store. Choose your program, pick your options, and check out.',
  },
  {
    question: 'What should my player bring?',
    answer:
      'Proper footwear for the venue, shin guards, a water bottle, and weather-appropriate training gear.',
  },
  {
    question: 'Do group packages include any extras?',
    answer:
      'Yes — all group packages include discount codes for private sessions, so players can top up their development one-on-one.',
  },
  {
    question: 'Do you offer camps and birthday parties?',
    answer:
      'We do — including goalkeeper camps and JStarz soccer birthday parties. We also run team, school, and community programs.',
  },
];

// Next occurrence of a weekday (0 = Sun … 6 = Sat) at a given time, this week.
function nextWeekdayAt(weekday: number, hour: number, minute = 0): Date {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  const diff = (weekday - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + diff);
  return d;
}
const at = (weekday: number, h: number, m = 0) => nextWeekdayAt(weekday, h, m);

/* Representative weekly schedule board (§10). Informational only — no links. */
const SESSIONS = [
  // NDO Fitness & Sandy Lake are winter-only indoor venues — no sessions there in summer (outdoor instead).
  { title: 'Private Training', startsAt: at(3, 18), endsAt: at(3, 21), location: 'NDO Fitness Gym', notes: 'Winter only · All ages — private 1-on-1 & small group.' },
  { title: 'U9 Player Development', startsAt: at(3, 19, 30), endsAt: at(3, 20, 30), location: 'NDO Fitness Gym', notes: 'Winter only · Ages 6–9.' },
  { title: 'Thursday Technical Soccer Lab', startsAt: at(4, 18), endsAt: at(4, 19), location: 'Sandy Lake Academy Gym', notes: 'Winter only.' },
  { title: 'Private Training', startsAt: at(4, 18), endsAt: at(4, 21), location: 'Sandy Lake Academy Gym', notes: 'Winter only · All ages.' },
  { title: 'U9 / U12 Development', startsAt: at(6, 9), endsAt: at(6, 10), location: 'BMO Soccer Centre', notes: '1st hour.' },
  { title: 'U13 Goalkeeping (Ages 8–13)', startsAt: at(6, 9), endsAt: at(6, 10), location: 'BMO Soccer Centre', notes: '1st hour.' },
  { title: 'U15 Development', startsAt: at(6, 10), endsAt: at(6, 11), location: 'BMO Soccer Centre', notes: '2nd hour.' },
  { title: 'U18 Goalkeeping (Ages 14+)', startsAt: at(6, 10), endsAt: at(6, 11), location: 'BMO Soccer Centre', notes: '2nd hour.' },
  { title: 'Private Training', startsAt: at(6, 11), endsAt: at(6, 13), location: 'BMO Soccer Centre' },
  { title: 'Private Training', startsAt: at(0, 10), endsAt: at(0, 13), location: 'BMO Soccer Centre' },
  { title: 'Sunday Team Starz (Rec Games)', startsAt: at(0, 13), endsAt: at(0, 14), location: 'BMO Soccer Centre', notes: 'Play • Win • Save.' },
  { title: 'Private Goalkeeper Session', startsAt: at(0, 14), endsAt: at(0, 15), location: 'BMO Soccer Centre', notes: 'Goalkeeper development.' },

  // Outdoor summer sessions (§10) — private 1-on-1 & small group, Mon–Fri.
  { title: 'Outdoor Private Sessions', startsAt: at(1, 9), endsAt: at(1, 11), location: 'Outdoor — Summer', notes: 'Morning · private 1-on-1 & small group.' },
  { title: 'Outdoor Private Sessions', startsAt: at(1, 17, 30), endsAt: at(1, 19, 30), location: 'Outdoor — Summer', notes: 'Evening session.' },
  { title: 'Outdoor Private Sessions', startsAt: at(2, 9), endsAt: at(2, 11), location: 'Outdoor — Summer', notes: 'Morning · private 1-on-1 & small group.' },
  { title: 'Private Speed & Performance', startsAt: at(2, 17, 30), endsAt: at(2, 19), location: 'Outdoor — Summer', notes: 'Strength, speed & conditioning.' },
  { title: 'Outdoor Private Sessions', startsAt: at(3, 9), endsAt: at(3, 11), location: 'Outdoor — Summer', notes: 'Morning session.' },
  { title: 'Outdoor Private Sessions', startsAt: at(4, 9), endsAt: at(4, 11), location: 'Outdoor — Summer', notes: 'Morning session.' },
  { title: 'Outdoor Private Sessions', startsAt: at(5, 9), endsAt: at(5, 11), location: 'Outdoor — Summer', notes: 'Morning · private 1-on-1 & small group.' },
  { title: 'Outdoor Private Sessions', startsAt: at(5, 17, 30), endsAt: at(5, 19, 30), location: 'Outdoor — Summer', notes: 'Evening session.' },
];

async function main() {
  console.log('🌱 Seeding JStarz database…');

  // Clear content tables (never touches User / auth accounts).
  await prisma.session.deleteMany();
  await prisma.contentBlock.deleteMany();
  await prisma.page.deleteMany();
  await prisma.program.deleteMany();
  await prisma.coach.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.faqItem.deleteMany();
  await prisma.mediaAsset.deleteMany();

  // Pages
  await prisma.page.createMany({ data: PAGES });
  console.log(`  • ${PAGES.length} pages`);

  // Programs (20) — descriptions from blurbs; Unsplash imagery as placeholders.
  await prisma.program.createMany({
    data: PROGRAMS.map((p, i) => ({
      title: p.title,
      description: p.blurb,
      priceDisplay: p.priceDisplay,
      imageUrl: p.imageUrl,
      shopifyUrl: p.shopifyUrl,
      isActive: true,
      sortOrder: i,
    })),
  });
  console.log(`  • ${PROGRAMS.length} programs`);

  // Sessions (weekly board)
  await prisma.session.createMany({
    data: SESSIONS.map((s) => ({ ...s, allDay: false })),
  });
  console.log(`  • ${SESSIONS.length} sessions`);

  // Coaches — Jordan (founder) + Zach (head GK coach).
  await prisma.coach.createMany({
    data: COACHES.map((coach, i) => ({
      name: coach.name,
      role: coach.role,
      bio: coach.bio,
      imageUrl: coach.imageUrl,
      sortOrder: i,
    })),
  });
  console.log(`  • ${COACHES.length} coaches`);

  // Testimonials (placeholders)
  await prisma.testimonial.createMany({
    data: TESTIMONIALS.map((t, i) => ({
      name: `${t.name} — ${t.role}`,
      quote: t.quote,
      sortOrder: i,
    })),
  });
  console.log(`  • ${TESTIMONIALS.length} testimonials`);

  // FAQ
  await prisma.faqItem.createMany({
    data: FAQS.map((f, i) => ({ ...f, sortOrder: i })),
  });
  console.log(`  • ${FAQS.length} FAQ items`);

  // Gallery (real session photography)
  await prisma.mediaAsset.createMany({
    data: GALLERY.map((g, i) => ({ url: g.url, alt: g.alt, type: 'gallery', sortOrder: i })),
  });
  console.log(`  • ${GALLERY.length} gallery photos`);

  // Site settings singleton
  const addr = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postal}`;
  await prisma.siteSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      email: SITE.email,
      phone: SITE.phone,
      address: addr,
      hours: 'See the schedule for weekly session times.',
      instagram: SITE.social.instagram,
      facebook: SITE.social.facebook,
      tiktok: SITE.social.tiktok,
      footerText: 'No ego. No politics. Just soccer.',
    },
  });
  console.log('  • site settings');

  // Home hero + banner singleton
  await prisma.homeHero.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      headline: 'Develop Your Game.',
      subhead:
        'One-on-one and small-group training (4–6 max) for players and goalkeepers of every age and background. More touches. Real coaching. A community that feels like family.',
      ctaLabel: 'Book a Session',
      // Guided path: hero CTA routes to the on-site catalog (visitors pick a
      // program, then that card links out to the specific Shopify product)
      // rather than the raw storefront. Owner-editable in the dashboard.
      ctaUrl: '/programs',
      bannerEnabled: false,
    },
  });
  console.log('  • home hero');

  console.log('✅ Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
