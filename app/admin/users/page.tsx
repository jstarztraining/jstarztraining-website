import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-guard';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CreateUserForm } from '@/components/admin/users/CreateUserForm';
import { UsersList, type UserRow } from '@/components/admin/users/UsersList';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const admin = await requireAdmin(); // redirects non-admins to /admin
  const users = await prisma.user.findMany({ orderBy: [{ role: 'asc' }, { createdAt: 'asc' }] });
  const rows: UserRow[] = users.map((u) => ({ id: u.id, email: u.email, name: u.name, role: u.role }));

  return (
    <div>
      <AdminPageHeader
        title="Users"
        description="Create Admin and Editor accounts and reset passwords. Admins can manage users; editors cannot."
        backHref="/admin"
        backLabel="Dashboard"
      />

      <div className="space-y-8">
        <CreateUserForm />

        <div>
          <h2 className="mb-4 font-heading text-sm font-bold uppercase tracking-[0.16em] text-ink/50">
            Accounts ({rows.length})
          </h2>
          <UsersList users={rows} currentUserId={admin.id} />
        </div>
      </div>
    </div>
  );
}
