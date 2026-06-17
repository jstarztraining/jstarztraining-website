import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SettingsForm } from '@/components/admin/SettingsForm';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });

  return (
    <div>
      <AdminPageHeader
        title="Site Settings"
        description="Contact details, social links, and footer — shown across the whole site."
        backHref="/admin"
        backLabel="Dashboard"
      />
      <SettingsForm settings={settings} />
    </div>
  );
}
