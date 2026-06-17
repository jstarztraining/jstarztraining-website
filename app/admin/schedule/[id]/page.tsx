import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SessionForm } from '@/components/admin/sessions/SessionForm';

export const dynamic = 'force-dynamic';

export default async function EditSessionPage({ params }: { params: { id: string } }) {
  const [session, programs] = await Promise.all([
    prisma.session.findUnique({ where: { id: params.id } }),
    prisma.program.findMany({ orderBy: { sortOrder: 'asc' }, select: { id: true, title: true } }),
  ]);
  if (!session) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit session" backHref="/admin/schedule" backLabel="Schedule" />
      <SessionForm session={session} programs={programs} />
    </div>
  );
}
