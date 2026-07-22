import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SortableAdminList } from '@/components/admin/SortableAdminList';
import { reorderSponsors, toggleSponsorActive, deleteSponsor } from '@/lib/actions/sponsors';

export const dynamic = 'force-dynamic';

export default async function AdminSponsorsPage() {
  const sponsors = await prisma.sponsor.findMany({ orderBy: { sortOrder: 'asc' } });
  const rows = sponsors.map((s) => ({
    id: s.id,
    isActive: s.isActive,
    primary: s.name,
    secondary: s.role ? `${s.tier} · ${s.role}` : s.tier,
    thumbUrl: s.logoUrl,
    showThumb: true,
  }));

  return (
    <div>
      <AdminPageHeader
        title="Sponsors & Supporters"
        description="Add, edit, reorder, and show/hide sponsors. Pick a tier per entry — logo businesses or name-only supporters. Drag the handle (or use ▲▼) to reorder."
        backHref="/admin"
        backLabel="Dashboard"
        action={
          <Link
            href="/admin/sponsors/new"
            className="inline-flex h-11 items-center rounded-full bg-gold px-6 font-heading font-semibold text-navy transition-colors hover:bg-gold-soft"
          >
            + New sponsor
          </Link>
        }
      />
      <SortableAdminList
        rows={rows}
        editHrefBase="/admin/sponsors"
        newHref="/admin/sponsors/new"
        entityLabel="sponsor"
        actions={{ reorder: reorderSponsors, toggle: toggleSponsorActive, remove: deleteSponsor }}
      />
    </div>
  );
}
