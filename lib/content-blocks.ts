// Registry of editable page text blocks for the Site Content dashboard module
// (§6A). Each block's `default` is the current copy — the DB ContentBlock value
// overrides it when set, so the registry is the single source of the baseline.
// Add a page here (and read it via getPageContent on that page) to make it
// editable.

export type BlockType = 'text' | 'textarea' | 'list';

export interface BlockDef {
  key: string;
  label: string;
  type: BlockType;
  default: string;
  help?: string;
}

export interface ContentPageDef {
  slug: string;
  title: string;
  blocks: BlockDef[];
}

export const CONTENT_PAGES: ContentPageDef[] = [
  {
    slug: 'about',
    title: 'About',
    blocks: [
      {
        key: 'hero_subtitle',
        label: 'Hero subtitle',
        type: 'textarea',
        default: 'At JStarz, soccer isn’t just training — it’s confidence, connection, and community.',
      },
      {
        key: 'story_heading',
        label: 'Story heading',
        type: 'text',
        default: 'Built by a coach who wished this existed.',
      },
      {
        key: 'story_p1',
        label: 'Story paragraph 1',
        type: 'textarea',
        default:
          'JStarz Training was founded by Jordan Ellis, a Jamaican-born Canadian coach who grew up loving the game and wishing he’d had access to the kind of support, development, and mentorship JStarz now provides. What started as a passion became a purpose: a space where players of all ages, backgrounds, and abilities feel welcomed, supported, and challenged to grow.',
      },
      {
        key: 'story_p2',
        label: 'Story paragraph 2',
        type: 'textarea',
        default:
          'Sessions feel less like traditional training and more like a family. Players are encouraged to express themselves, make mistakes and grow, and compete, laugh, and build confidence. Parents are part of it too. We specialize in individual and small-group training (4–6 players max) for maximum touches and coach interaction — and we’re proudly club-neutral. All teams, all backgrounds. If it involves a soccer ball, we do it.',
      },
      {
        key: 'whatwedo_heading',
        label: '“What we do” heading',
        type: 'text',
        default: 'Everything, if it involves a ball.',
      },
      {
        key: 'whatwedo_items',
        label: '“What we do” items',
        type: 'list',
        help: 'One item per line.',
        default: [
          'Private 1-on-1 & small-group training (players & goalkeepers)',
          'Goalkeeper development',
          'Strength, speed & conditioning',
          'School programs & community events',
          'Soccer birthday parties',
          'Camps & tournaments',
          'Fundraisers & community initiatives',
        ].join('\n'),
      },
      {
        key: 'mentality_body',
        label: 'Mentality paragraph',
        type: 'textarea',
        default:
          'We believe in hustle, creativity, and failing fast to learn faster. You’re not just joining training — you’re joining a community.',
      },
      {
        key: 'mission_items',
        label: 'Mission items',
        type: 'list',
        help: 'One item per line.',
        default: [
          'Grow the game across Halifax & Nova Scotia',
          'Develop confident players and people',
          'Create youth-leadership opportunities',
          'Connect communities through sport',
        ].join('\n'),
      },
      {
        key: 'close_heading',
        label: 'Closing heading',
        type: 'text',
        default: 'Train with purpose. Build confidence. Enjoy the game.',
      },
    ],
  },
];

export function getPageDef(slug: string): ContentPageDef | undefined {
  return CONTENT_PAGES.find((p) => p.slug === slug);
}
