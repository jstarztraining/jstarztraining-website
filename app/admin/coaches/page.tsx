import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SortableAdminList } from '@/components/admin/SortableAdminList';
import { reorderCoaches, toggleCoachActive, deleteCoach } from '@/lib/actions/coaches';

export const dynamic = 'force-dynamic';

export default async function AdminCoachesPage() {
  const coaches = await prisma.coach.findMany({ orderBy: { sortOrder: 'asc' } });
  const rows = coaches.map((c) => ({
    id: c.id,
    isActive: c.isActive,
    primary: c.name,
    secondary: c.role,
    thumbUrl: c.imageUrl,
    showThumb: true,
  }));

  return (
    <div>
      <AdminPageHeader
        title="Coaches & Staff"
        description="Add, edit, reorder, and show/hide coaches. Drag the handle (or use ▲▼) to reorder."
        backHref="/admin"
        backLabel="Dashboard"
        action={
          <Link href="/admin/coaches/new" className="inline-flex h-11 items-center rounded-full bg-gold px-6 font-heading font-semibold text-navy transition-colors hover:bg-gold-soft">
            + New coach
          </Link>
        }
      />
      <SortableAdminList
        rows={rows}
        editHrefBase="/admin/coaches"
        newHref="/admin/coaches/new"
        entityLabel="coach"
        actions={{ reorder: reorderCoaches, toggle: toggleCoachActive, remove: deleteCoach }}
      />
    </div>
  );
}
