import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SessionForm } from '@/components/admin/sessions/SessionForm';

export const dynamic = 'force-dynamic';

export default async function NewSessionPage() {
  const programs = await prisma.program.findMany({
    orderBy: { sortOrder: 'asc' },
    select: { id: true, title: true },
  });

  return (
    <div>
      <AdminPageHeader title="New session" backHref="/admin/schedule" backLabel="Schedule" />
      <SessionForm programs={programs} />
    </div>
  );
}
