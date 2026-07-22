import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SponsorForm } from '@/components/admin/sponsors/SponsorForm';

export default function NewSponsorPage() {
  return (
    <div>
      <AdminPageHeader title="New sponsor" backHref="/admin/sponsors" backLabel="Sponsors" />
      <SponsorForm />
    </div>
  );
}
