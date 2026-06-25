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
    id: 'sat-bmo-private-soccer',
    title: 'Saturday BMO Private Soccer Training',
    priceDisplay: 'From $54.99',
    category: 'Private',
    blurb: 'One-on-one technical work at BMO Soccer Centre — maximum touches, full coach focus.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/private-training.jpg',
    imageAlt: 'Saturday BMO Private Soccer Training — JStarz Training, Halifax NS',
  },
  {
    id: 'sun-bmo-private-soccer',
    title: 'Sunday BMO Private Soccer Training',
    priceDisplay: 'From $54.99',
    category: 'Private',
    blurb: 'Weekend private sessions built around your player’s goals and game.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/private-training.jpg',
    imageAlt: 'Sunday BMO Private Soccer Training — JStarz Training, Halifax NS',
  },
  {
    id: 'sun-bmo-private-keeper',
    title: 'Sunday BMO Private Goalkeeper Sessions',
    priceDisplay: 'From $54.99',
    category: 'Goalkeeping',
    blurb: 'Specialist keeper coaching — handling, footwork, shot-stopping, distribution.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/goalkeeper-training.jpg',
    imageAlt: 'Sunday BMO Private Goalkeeper Sessions — JStarz Training, Halifax NS',
  },
  {
    id: 'sat-bmo-private-keeper',
    title: 'Saturday BMO Private Goalkeeper Sessions',
    priceDisplay: 'From $54.99',
    category: 'Goalkeeping',
    blurb: 'Dedicated one-on-one goalkeeper development at BMO Soccer Centre.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/goalkeeper-training.jpg',
    imageAlt: 'Saturday BMO Private Goalkeeper Sessions — JStarz Training, Halifax NS',
  },
  {
    id: 'outdoor-private-soccer',
    title: 'Outdoor Private Soccer Sessions',
    priceDisplay: 'From $49.99',
    category: 'Private',
    blurb: 'Summer training under the sun — private sessions on grass, Mon–Fri.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/private-training.jpg',
    imageAlt: 'Outdoor Private Soccer Sessions — JStarz Training, Halifax NS',
  },
  {
    id: 'outdoor-private-keeper',
    title: 'Outdoor Private Goalkeeping Sessions',
    priceDisplay: 'From $49.99',
    category: 'Goalkeeping',
    blurb: 'Outdoor keeper work — angles, crosses, and distribution on the full pitch.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/goalkeeper-training.jpg',
    imageAlt: 'Outdoor Private Goalkeeping Sessions — JStarz Training, Halifax NS',
  },
  {
    id: 'speed-performance',
    title: 'Private Speed & Performance Training',
    priceDisplay: 'From $54.99',
    category: 'Private',
    blurb: 'Strength, speed and conditioning tailored to the demands of the game.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/athletic-conditioning.jpg',
    imageAlt: 'Private Speed & Performance Training — JStarz Training, Halifax NS',
  },
  {
    id: 'thursday-technical-soccer-lab',
    title: 'Thursday Technical Soccer Lab',
    priceDisplay: 'From $49.99',
    category: 'Development',
    blurb: 'Small-group technical lab at Sandy Lake — first touch, dribbling, finishing.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/group-training.jpg',
    imageAlt: 'Thursday Technical Soccer Lab — JStarz Training, Halifax NS',
  },
  {
    id: 'thursday-technical-keeper-lab',
    title: 'Thursday Technical Goalkeeper Lab',
    priceDisplay: 'From $49.99',
    category: 'Goalkeeping',
    blurb: 'Group keeper lab focused on the fundamentals that win games.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/goalkeeper-training.jpg',
    imageAlt: 'Thursday Technical Goalkeeper Lab — JStarz Training, Halifax NS',
  },
  {
    id: 'u9-development',
    title: 'U9 Player Development Program',
    priceDisplay: 'From $35.00',
    category: 'Development',
    blurb: 'Ages 6–9. Confidence, coordination and a love of the game come first.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/group-training.jpg',
    imageAlt: 'U9 Player Development Program — JStarz Training, Halifax NS',
  },
  {
    id: 'u12-attacker-development',
    title: 'U12 Attacker Development Program',
    priceDisplay: 'From $35.00',
    category: 'Development',
    blurb: 'Sharpen attacking instincts — movement, combinations and finishing.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/group-training.jpg',
    imageAlt: 'U12 Attacker Development Program — JStarz Training, Halifax NS',
  },
  {
    id: 'u13-goalkeeper-group',
    title: 'U13 Goalkeeper Group Training',
    priceDisplay: 'From $35.00',
    category: 'Goalkeeping',
    blurb: 'Ages 8–13. Group keeper sessions building brave, technical goalkeepers.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/gk-wars.jpg',
    imageAlt: 'U13 Goalkeeper Group Training — JStarz Training, Halifax NS',
  },
  {
    id: 'u15-attacker-development',
    title: 'U15 Attacker Development Program',
    priceDisplay: 'From $35.00',
    category: 'Development',
    blurb: 'Game-realistic attacking work for the U15 age group.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/group-training.jpg',
    imageAlt: 'U15 Attacker Development Program — JStarz Training, Halifax NS',
  },
  {
    id: 'u18-goalkeeper-group',
    title: 'U18 Goalkeeper Group Training',
    priceDisplay: 'From $35.00',
    category: 'Goalkeeping',
    blurb: 'Ages 14–18. Advanced keeper group training and match preparation.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/gk-wars.jpg',
    imageAlt: 'U18 Goalkeeper Group Training — JStarz Training, Halifax NS',
  },
  {
    id: 'defender-development',
    title: 'Defender Development Workshops',
    priceDisplay: 'From $31.99',
    category: 'Development',
    blurb: 'Defending as a craft — positioning, 1v1s, and reading the game.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/group-training.jpg',
    imageAlt: 'Defender Development Workshops — JStarz Training, Halifax NS',
  },
  {
    id: 'team-training',
    title: 'JStarz Team Training Programs',
    priceDisplay: 'From $29.99',
    category: 'Development',
    blurb: 'Bring your whole team — sessions designed around your group’s needs.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/team-training.jpg',
    imageAlt: 'JStarz Team Training Programs — JStarz Training, Halifax NS',
  },
  {
    id: 'goalie-warz-camp',
    title: 'Goalie Warz Camp',
    priceDisplay: 'From $40.00',
    category: 'Camps & Events',
    blurb: 'High-energy goalkeeper camp — compete, learn, and level up.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/gk-wars.jpg',
    imageAlt: 'Goalie Warz Camp — JStarz Training, Halifax NS',
  },
  {
    id: 'birthday-party',
    title: 'JStarz Soccer Birthday Party',
    priceDisplay: 'From $46.99',
    category: 'Camps & Events',
    blurb: 'A soccer birthday to remember — games, coaching, and a whole lot of fun.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/birthday-parties.jpg',
    imageAlt: 'JStarz Soccer Birthday Party — JStarz Training, Halifax NS',
  },
  {
    id: 'team-starz-rec-games',
    title: 'Sunday Team Starz: Play • Win • Save',
    priceDisplay: 'From $14.00',
    category: 'Camps & Events',
    blurb: 'Rec games for the love of it — play, compete, and have a blast on Sundays.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/team-training.jpg',
    imageAlt: 'Sunday Team Starz: Play • Win • Save — JStarz Training, Halifax NS',
  },
  {
    id: 'soccer-house-1v1-championship',
    title: 'JStarz x Soccer House U18 1v1 Championship',
    priceDisplay: '$20.00',
    category: 'Camps & Events',
    // Genuinely single-option → cart-permalink candidate (§5).
    blurb: 'A one-day U18 1v1 showdown. Settle it on the pitch.',
    shopifyUrl: SITE.shopifyStoreUrl,
    imageUrl: '/images/community-events.jpg',
    imageAlt: 'JStarz x Soccer House U18 1v1 Championship — JStarz Training, Halifax NS',
  },
  {
    id: 'online-development-game-analysis',
    title: 'Online Development & Game Analysis',
    priceDisplay: 'From $56.99 + HST',
    category: 'Development',
    blurb:
      'Virtual game analysis, tactical reviews, position-specific feedback, mindset development, and at-home training support for players looking to improve beyond the field — personalized insights and actionable recommendations to accelerate development and match performance.',
    // Empty shopifyUrl → no store link yet. Cards treat this as "Coming soon"
    // and render a disabled, non-clickable CTA (see ProgramCard).
    shopifyUrl: '',
    // No photo yet — falls back to the navy gradient placeholder. Jordan to add.
    imageUrl: '',
    imageAlt: '',
  },
];

// A representative cross-section featured on the homepage preview.
export const FEATURED_PROGRAM_IDS = [
  'sat-bmo-private-soccer',
  'sun-bmo-private-keeper',
  'u9-development',
  'speed-performance',
  'goalie-warz-camp',
  'birthday-party',
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
