/**
 * Shared URL validation for dashboard forms.
 *
 * Two rules, because the fields split into two kinds:
 *  - Links that leave the site (Shopify) must be absolute.
 *  - Images and internal CTAs may be root-relative — seeded assets live at
 *    "/images/x.jpg" and the hero CTA points at "/programs".
 *
 * Previously a single `isUrl` requiring https?:// was copy-pasted across three
 * action files, which rejected every seeded image path.
 */

/** Absolute http(s) URL — for links pointing off-site. */
export const isAbsoluteUrl = (v: string) => /^https?:\/\//i.test(v);

/** Absolute URL, or a root-relative site path like "/images/x.jpg". */
export const isUrlOrPath = (v: string) => isAbsoluteUrl(v) || v.startsWith('/');

/**
 * Add a missing https:// to a pasted link.
 *
 * iOS Safari and Chrome both hide the scheme in the address bar, so links copied
 * from a phone routinely arrive as "shop.example.com/products/x". Rejecting those
 * is a papercut with no upside — the intent is unambiguous.
 *
 * Conservative by design: only bare host-looking values are touched. Anything that
 * already carries a scheme (including "javascript:") or is a site path passes
 * through untouched, so the validators still get to reject it.
 */
export function withScheme(v: string): string {
  const trimmed = v.trim();
  if (!trimmed) return trimmed;
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed; // already has a scheme
  if (trimmed.startsWith('/')) return trimmed; // site path or protocol-relative
  if (!/^[\w-]+(\.[\w-]+)+/.test(trimmed)) return trimmed; // doesn't look like a host
  return `https://${trimmed}`;
}

/** Error copy for fields that accept either form. */
export const URL_OR_PATH_ERROR = 'Must be a full URL (https://…) or a site path (/images/…).';

/** Error copy for fields that require an absolute URL. */
export const ABSOLUTE_URL_ERROR = 'Must be a full URL (https://…).';
