// The fixed sponsor tiers. Order here = the order tiers render on /sponsors,
// and each tier gets a distinct visual weight on the public page:
//   Premier Sponsors  → large logo tiles
//   Community Partners → medium logo tiles
//   Supporters         → compact name chips (individuals, no logo needed)
// The dashboard form offers exactly these as a dropdown.
export const SPONSOR_TIERS = ['Premier Sponsors', 'Community Partners', 'Supporters'] as const;

export type SponsorTier = (typeof SPONSOR_TIERS)[number];

export const DEFAULT_SPONSOR_TIER: SponsorTier = 'Supporters';
