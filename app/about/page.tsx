import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/layout/PagePlaceholder';

export const metadata: Metadata = { title: 'About' };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="About"
      title="Our Story"
      blurb="More than an academy — a soccer community. The full JStarz story is coming soon."
    />
  );
}
