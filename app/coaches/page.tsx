import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/layout/PagePlaceholder';

export const metadata: Metadata = { title: 'Coaches' };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="The Team"
      title="Coaches & Staff"
      blurb="Meet the coaches behind JStarz. Bios and photos are coming soon."
    />
  );
}
