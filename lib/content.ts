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
    // Multi-product collection (Jordan's request): all 1-on-1 offerings, not one product.
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
    shopifyUrl: `${SITE.shopifyStoreUrl}/products/u10-group-soccer-training-sessions`,
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
    shopifyUrl: `${SITE.shopifyStoreUrl}/products/jstarz-masters-program`,
    imageUrl: '/images/team-workshops.jpg',
    imageAlt: 'A JStarz team gathered for a workshop in the indoor dome in Halifax',
  },
  {
    id: 'goalkeeper-training',
    title: 'Goalkeeper Training',
    priceDisplay: 'From $49.99 + HST',
    category: 'Goalkeeping',
    blurb:
      'Specialized goalkeeper training focused on handling, footwork, diving, positioning, distribution, communication, and match-specific situations.',
    // Goalkeeping collection (Jordan's request): all GK offerings, private + group.
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
    // Goalkeeping collection (Jordan's request): both GK cards point here.
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
    shopifyUrl: `${SITE.shopifyStoreUrl}/products/1-on-1-plyometrics-training`,
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
    // Product handle contains emoji (JSt🌟rz Birthday Challenge 🎂🎈) — kept URL-encoded.
    shopifyUrl: `${SITE.shopifyStoreUrl}/products/jst%F0%9F%8C%9Frz-birthday-challenge-%F0%9F%8E%82%F0%9F%8E%88`,
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
    shopifyUrl: `${SITE.shopifyStoreUrl}/products/soccer-camps`,
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
    // No standalone community-events product in the live store — "Coming soon"
    // until Jordan provides the product URL (community events vary by event).
    shopifyUrl: '',
    imageUrl: '/images/community-tournaments.jpg',
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

// Real, published 5★ reviews from JStarz's store (Judge.me export, §13).
// First name + last initial; role reflects the program reviewed.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'My daughter’s first 1:1 keeper training was wonderful. Addy greeted us at the door and introduced herself before getting started. Her constant feedback and guidance was really great — I could watch my kiddo’s energy, confidence and skill improve throughout the session!',
    name: 'Jenn R.',
    role: 'Parent · Goalkeeper training',
  },
  {
    quote:
      'I’ve been enlightened to a lot of new things — positional awareness, shooting techniques, being vocal on the field. I’d highly recommend Coach Jordan and Marvin to anyone looking to take their game to the next level.',
    name: 'Oke',
    role: 'Player · Attacker development',
  },
  {
    quote:
      'My son has grown so much as a player since trying these sessions. He’s learned to read attackers and developed confidence in 1v1 situations. The coaches make the sessions fun, and he leaves asking when he can go to his next one!',
    name: 'Serena G.',
    role: 'Parent · Defender sessions',
  },
  {
    quote:
      'I highly recommend JStarz for kids and young adults of all levels. Jordan and his team have created a wonderful community here, with a focus on making development fun.',
    name: 'Miranda F.',
    role: 'Parent · JStarz community',
  },
  {
    quote:
      'Friendly atmosphere, small groups, training essential skills, and great tips for improving yourself as a goalkeeper. Highly recommend.',
    name: 'Kir A.',
    role: 'Goalkeeper · U15 group',
  },
  {
    quote:
      'Ayden loved the warm, inclusive environment! He really enjoyed learning new skills and felt uplifted by the amazing encouragement, which gave his confidence a big boost.',
    name: 'Larissa L.',
    role: 'Parent · Technical labs',
  },
  {
    quote:
      'Coach Jordan made it engaging and fun for all the kids. Hands down the best birthday party we’ve ever had. Thank you, Coach Jordan!',
    name: 'Kala K.',
    role: 'Parent · Birthday party',
  },
  {
    quote: 'Max always has a great session with Zach!',
    name: 'Judith P.',
    role: 'Parent · Goalkeeper training',
  },
];

/* -------------------------------------------------------------------- Coach */
export const HEAD_COACH = {
  name: 'Jordan Ellis',
  role: 'Founder & Head Coach',
  bio: 'A Jamaican-born Canadian coach who grew up loving the game and wishing he’d had the support, development and mentorship JStarz now provides. What started as a passion became a purpose — a place where players of every background feel welcomed, challenged, and part of something.',
  imageUrl: '/images/jordan-coach.jpg',
  imageAlt: 'Jordan Ellis coaching a group of young players during a JStarz session in Halifax.',
};

// Full coaching staff (§13). Jordan's bio is his real voice; Zach's is a
// placeholder derived from the GK program — replace with Jordan's real copy.
export interface Coach {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  imageAlt: string;
}
export const COACHES: Coach[] = [
  HEAD_COACH,
  {
    name: 'Zach Stevenson',
    role: 'Head Goalkeeper Coach',
    bio: 'Zach brings incredible passion and experience to goalkeeper development. A Canada Soccer C Licence trained coach, he leads the goalkeeper department at Inter Halifax and has coached 100+ goalkeepers ranging from beginners to athletes competing at university, Canada Games, and academy levels.\n\nKnown for his positive personality and technical knowledge, Zach has become one of the most respected goalkeeper coaches in the local game.',
    imageUrl: '/images/zach-portrait.jpg',
    imageAlt: 'Zach Stevenson coaching a young goalkeeper during a JStarz session in Halifax.',
  },
  {
    name: 'Marvin Okello',
    role: 'Senior Performance Coach',
    bio: 'Marvin has competed at the highest levels of local soccer and has a deep understanding of the game. His coaching emphasizes technical excellence, intelligent decision-making, and elite ball striking.\n\nAlongside coaching HCU’s men’s program, Marvin works with CSI Atlantic and FunSports while maintaining strong connections within the Halifax Wanderers soccer community. His experience allows him to bridge high-performance sport with player development at every level.',
    imageUrl: '/images/marvin-portrait.jpg',
    imageAlt: 'Marvin Okello leading a JStarz performance and fitness session in Halifax.',
  },
  {
    name: 'Addison Graves',
    role: 'Goalkeeper Coach',
    bio: 'Addison shares the same passion for goalkeeping as Zach and brings valuable experience from training with professional goalkeepers in Ontario.\n\nShe excels at working with youth and female goalkeepers, creating an encouraging environment where players can develop confidence, technique, and a genuine love for the position through relatable mentorship.',
    imageUrl: '/images/addison-portrait.jpg',
    imageAlt: 'Addison Graves coaching a 1-on-1 dribbling battle during a JStarz session in Halifax.',
  },
];

/* ------------------------------------------------------------------ Gallery */
// Real JStarz session photography (§13). Seeded into MediaAsset for /gallery.
export interface GalleryItem {
  url: string;
  alt: string;
}
export const GALLERY: GalleryItem[] = [
  { url: '/images/dribbling.jpg', alt: 'A young JStarz player dribbling through slalom poles during technical training.' },
  { url: '/images/gk-training.jpg', alt: 'A JStarz goalkeeper set in front of the net during a goalkeeper development session.' },
  { url: '/images/zach-gk.jpg', alt: 'Head goalkeeper coach Zach Stevenson working a young keeper through a catching drill.' },
  { url: '/images/marvin-coach.jpg', alt: 'Senior performance coach Marvin Okello running a fitness session with young players.' },
  { url: '/images/addison-coach.jpg', alt: 'Goalkeeper coach Addison Graves guiding a 1-on-1 dribbling battle on the pitch.' },
  { url: '/images/event-trophy.jpg', alt: 'Young players lifting a trophy together at a JStarz community tournament.' },
  { url: '/images/home-features.jpg', alt: 'A JStarz player striking the ball during an indoor session in Halifax.' },
  { url: '/images/coach-action.jpg', alt: 'A JStarz coach leading a small-group session on the pitch.' },
  { url: '/images/home-story.jpg', alt: 'The full JStarz training community — players in the gold-star kit and coaches together.' },
  { url: '/images/coaching-gym.jpg', alt: 'A JStarz coach guiding players through a drill in the gym.' },
  { url: '/images/coach-ball.jpg', alt: 'A JStarz coach setting up a technical drill while players train behind.' },
  // Additional session photography (§13).
  { url: '/images/gallery-01.jpg', alt: 'Young JStarz players in team kit at an indoor session in Halifax.' },
  { url: '/images/gallery-02.jpg', alt: 'The JStarz coaching staff talking through a session plan on the pitch.' },
  { url: '/images/gallery-03.jpg', alt: 'A young player dribbling at speed during JStarz training.' },
  { url: '/images/gallery-04.jpg', alt: 'Players competing in a 1-on-1 duel during a small-group session.' },
  { url: '/images/gallery-05.jpg', alt: 'A JStarz coach guiding a young player through a cone drill in the gym.' },
  { url: '/images/gallery-06.jpg', alt: 'A coach working closely with a young player between drills.' },
  { url: '/images/gallery-07.jpg', alt: 'Young players gathered around their coach during a training break.' },
  { url: '/images/gallery-08.jpg', alt: 'A 1-on-1 challenge in front of the net during a JStarz session.' },
  { url: '/images/gallery-09.jpg', alt: 'JStarz coaches reviewing notes together courtside.' },
  { url: '/images/gallery-10.jpg', alt: 'JStarz players posing together in team kit after a session.' },
];
