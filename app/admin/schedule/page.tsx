import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SessionsList, type SessionRow } from '@/components/admin/sessions/SessionsList';

export const dynamic = 'force-dynamic';

const fmt = new Intl.DateTimeFormat('en-CA', {
  weekday: 'short',
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'America/Halifax',
});

export default async function AdminSchedulePage() {
  const sessions = await prisma.session.findMany({ orderBy: { startsAt: 'asc' } });
  const rows: SessionRow[] = sessions.map((s) => ({
    id: s.id,
    title: s.title,
    whenLabel: s.allDay ? `${fmt.format(s.startsAt).split(',')[0]} · All day` : fmt.format(s.startsAt),
    location: s.location,
    notes: s.notes,
  }));

  return (
    <div>
      <AdminPageHeader
        title="Schedule"
        description="Weekly sessions shown on the public schedule board. Informational only — no register links."
        backHref="/admin"
        backLabel="Dashboard"
        action={
          <Link href="/admin/schedule/new" className="inline-flex h-11 items-center rounded-full bg-gold px-6 font-heading font-semibold text-navy transition-colors hover:bg-gold-soft">
            + New session
          </Link>
        }
      />
      <SessionsList rows={rows} />
    </div>
  );
}
