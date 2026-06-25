import { SITE } from './site';

/* -----------------------------------------------------------------------------
   PLACEHOLDER CONTENT
   Stand-in data until Supabase/Prisma is wired in the next step. Program copy and
   prices are from the brief (§5); imagery is verified Unsplash, slated for swap
   with Jordan's real action photos (§13). Shopify links point at the store for
   now — exact product URLs land once staff access is granted.
----------------------------------------------------------------------------- */

export type ProgramCategory =
  | 'Private'
  | 'Goalkeeping'
  | 'Development'
  | 'Camps & Events';

export interface Program {
  id: string;
  title: string;
  priceDisplay: string;
  category: ProgramCategory;
  blurb: string;
  shopifyUrl: string;
  imageUrl: string;
  imageAlt: string;
}

// Verified Unsplash CDN id helper — still used for the head-coach placeholder
// until Jordan's photo lands (§13). Program imagery now uses real /images/ files.
const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PROGRAMS: Program[] = [
  {
    id: 'private-soccer-training',
    title: 'Private Soccer Training',
    priceDisplay: 'From $49.99 + HST',
    category: 'Private',
    blurb:
      'Personalized one-on-one training designed to improve technical ability, confidence, decision-making, position-specific skills, and overall game performance. Available for youth and adult players of all levels.',
    shopifyUrl: `${SITE.shopifyStoreUrl}/collections/1-on-1-training`,
    imageUrl: '/images/private-training.jpg',
    imageAlt: 'One-on-one JStarz soccer training session in Halifax',
  },
  {
    id: 'group-training-development',
    title: 'Group Training & Development',
    priceDisplay: 'From $35.00 + HST per player',
    category: 'Development',
    blurb:
      'Small-group and academy-style training focused on technical development, attacking play, defending, game awareness, and confidence in a fun, competitive environment.',
    shopifyUrl: `${SITE.shopifyStoreUrl}/collections/group-training`,
    imageUrl: '/images/group-training.jpg',
    imageAlt: 'JStarz small-group soccer development session',
  },
  {
    id: 'team-training-workshops',
    title: 'Team Training & Workshops',
    priceDisplay: 'Custom pricing',
    category: 'Development',
    blurb:
      'Customized training sessions for clubs, schools, academies, and teams. Sessions can focus on technical, tactical, physical, goalkeeper, or team-specific objectives.',
    shopifyUrl: `${SITE.shopifyStoreUrl}/collections/group-training`,
    imageUrl: '/images/team-training.jpg',
    imageAlt: 'JStarz team training workshop for clubs and schools',
  },
  {
    id: 'goalkeeper-training',
    title: 'Goalkeeper Training',
    priceDisplay: 'From $49.99 + HST',
    category: 'Goalkeeping',
    blurb:
      'Specialized goalkeeper training focused on handling, footwork, diving, positioning, distribution, communication, and match-specific situations.',
    shopifyUrl: `${SITE.shopifyStoreUrl}/collections/goalkeeping`,
    imageUrl: '/images/goalkeeper-training.jpg',
    imageAlt: 'JStarz goalkeeper training — diving and handling drills',
  },
  {
    id: 'gk-group-gk-wars',
    title: 'GK Group Sessions & GK Wars',
    priceDisplay: 'From $35.00 + HST',
    category: 'Goalkeeping',
    blurb:
      'Small-group goalkeeper training and competitive GK Wars events designed to develop technical skills, confidence, and game performance in a challenging environment.',
    shopifyUrl: `${SITE.shopifyStoreUrl}/collections/goalkeeping`,
    imageUrl: '/images/gk-wars.jpg',
    imageAlt: 'JStarz GK Wars competitive goalkeeper group session',
  },
  {
    id: 'athletic-conditioning',
    title: 'Athletic Conditioning & Performance',
    priceDisplay: 'From $49.99 + HST',
    category: 'Development',
    blurb:
      'Speed, agility, strength, explosiveness, injury prevention, and athletic development training designed to help athletes perform at their highest level.',
    shopifyUrl: `${SITE.shopifyStoreUrl}/collections/athletic-conditioning`,
    imageUrl: '/images/athletic-conditioning.jpg',
    imageAlt: 'JStarz speed and agility conditioning training',
  },
  {
    id: 'birthday-parties-camps',
    title: 'Birthday Parties & Private Camps',
    priceDisplay: 'From $299.99 + HST',
    category: 'Camps & Events',
    blurb:
      'Fun, engaging soccer-themed birthday parties and private camp experiences featuring games, challenges, competitions, and professional coaching in a safe and exciting environment.',
    shopifyUrl: `${SITE.shopifyStoreUrl}/collections/supplementary-programs`,
    imageUrl: '/images/birthday-parties.jpg',
    imageAlt: 'JStarz soccer birthday party and private camp',
  },
  {
    id: 'soccer-camps',
    title: 'Soccer Camps',
    priceDisplay: 'From $56.99 + HST',
    category: 'Camps & Events',
    blurb:
      'Half-day and full-day camps featuring technical training, competitions, small-sided games, leadership development, and plenty of opportunities to learn, improve, and have fun.',
    shopifyUrl: `${SITE.shopifyStoreUrl}/collections/supplementary-programs`,
    imageUrl: '/images/soccer-camps.jpg',
    imageAlt: 'JStarz half- and full-day soccer camp',
  },
  {
    id: 'community-events',
    title: 'Community Events & Tournaments',
    priceDisplay: 'Varies by event',
    category: 'Camps & Events',
    blurb:
      'Community-focused soccer events, scrimmages, tournaments, showcases, and special development opportunities that bring players and families together through the game.',
    shopifyUrl: `${SITE.shopifyStoreUrl}/collections/community-events`,
    imageUrl: '/images/community-events.jpg',
    imageAlt: 'JStarz community soccer event and tournament',
  },
  {
    id: 'online-development-game-analysis',
    title: 'Online Development & Game Analysis',
    priceDisplay: 'From $56.99 + HST',
    category: 'Development',
    blurb:
      'Virtual game analysis, tactical reviews, position-specific feedback, mindset development, and at-home training support for players looking to improve beyond the field. Players receive personalized insights and actionable recommendations to accelerate their development and improve match performance.',
    // Empty shopifyUrl → "Coming soon" non-clickable card (see ProgramCard).
    shopifyUrl: '',
    // No photo yet — falls back to the navy gradient placeholder. Jordan to add.
    imageUrl: '',
    imageAlt: '',
  },
];

// A representative cross-section featured on the homepage preview.
export const FEATURED_PROGRAM_IDS = [
  'private-soccer-training',
  'goalkeeper-training',
  'group-training-development',
  'gk-group-gk-wars',
  'soccer-camps',
  'birthday-parties-camps',
];

export const FEATURED_PROGRAMS = FEATURED_PROGRAM_IDS.map(
  (id) => PROGRAMS.find((p) => p.id === id)!,
);

/* ---------------------------------------------------------------- Hero stats */
export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  staticValue?: string; // non-numeric stats skip the count-up
}

export const HERO_STATS: Stat[] = [
  { value: 500, suffix: '+', label: 'Players developed' },
  { value: 6, prefix: '4–', label: 'Max group size', staticValue: '4–6' },
  { value: 4, label: 'Training venues' },
  { value: 0, label: 'Ages 6 to adult', staticValue: 'All ages' },
];

/* ------------------------------------------------ What sets JStarz apart */
export interface Feature {
  title: string;
  body: string;
}

export const FEATURES: Feature[] = [
  {
    title: 'Small groups, max 4–6',
    body: 'Individual and small-group training so every player gets maximum touches and real coach interaction — never lost in a crowd.',
  },
  {
    title: 'Goalkeeper specialists',
    body: 'Dedicated keeper development from grassroots to U18 — handling, footwork, shot-stopping and distribution coached properly.',
  },
  {
    title: 'Proudly club-neutral',
    body: 'All teams, all backgrounds, all welcome. We develop the player in front of us — no politics, no egos.',
  },
  {
    title: 'All ages, all levels',
    body: 'From first-touch six-year-olds to adult private clients. If it involves a soccer ball, we do it.',
  },
];

export const VENUES = [
  'BMO Soccer Centre',
  'NDO Fitness Gym',
  'Sandy Lake Academy Gym',
  'Outdoor — Summer',
];

/* ------------------------------------------------------------ Testimonials */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

// Placeholder quotes — replace with Jordan's real, permissioned testimonials (§13).
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'My son went from nervous on the ball to fearless. The small groups mean he actually gets coached every single session.',
    name: 'Sarah M.',
    role: 'Parent, U12 player',
  },
  {
    quote:
      'Jordan treats every keeper like a project. The goalkeeper sessions are the best value in the city, full stop.',
    name: 'David R.',
    role: 'Parent, U15 goalkeeper',
  },
  {
    quote:
      'It honestly feels more like a family than a training program. The kids compete hard and leave smiling.',
    name: 'Amanda T.',
    role: 'Parent, U9 player',
  },
];

/* -------------------------------------------------------------------- Coach */
export const HEAD_COACH = {
  name: 'Jordan Ellis',
  role: 'Founder & Head Coach',
  bio: 'A Jamaican-born Canadian coach who grew up loving the game and wishing he’d had the support, development and mentorship JStarz now provides. What started as a passion became a purpose — a place where players of every background feel welcomed, challenged, and part of something.',
  imageUrl: img('1526232761682-d26e03ac148e', 900),
  imageAlt: 'Soccer coach on the sideline during a training session.',
};
