import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ProgramsList } from '@/components/admin/programs/ProgramsList';

export const dynamic = 'force-dynamic';

export default async function AdminProgramsPage() {
  const programs = await prisma.program.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div>
      <AdminPageHeader
        title="Programs"
        description="Add, edit, reorder, and show/hide programs. Drag the handle (or use ▲▼) to reorder."
        backHref="/admin"
        backLabel="Dashboard"
        action={
          <Link
            href="/admin/programs/new"
            className="inline-flex h-11 items-center rounded-full bg-gold px-6 font-heading font-semibold text-navy transition-colors hover:bg-gold-soft"
          >
            + New program
          </Link>
        }
      />
      <ProgramsList programs={programs} />
    </div>
  );
}
