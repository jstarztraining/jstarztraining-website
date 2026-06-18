const BASE = 'https://jstarztraining.com';

/** Emits BreadcrumbList structured data: Home › <current> (§8). */
export function BreadcrumbJsonLd({ name, path }: { name: string; path: string }) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name, item: `${BASE}${path}` },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}
