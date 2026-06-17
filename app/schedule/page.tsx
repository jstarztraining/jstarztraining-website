import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/layout/PagePlaceholder';

export const metadata: Metadata = { title: 'Schedule' };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Schedule"
      title="Schedule"
      blurb="Weekly sessions across BMO Soccer Centre, NDO, Sandy Lake, and outdoor — the full training calendar is on its way."
    />
  );
}
