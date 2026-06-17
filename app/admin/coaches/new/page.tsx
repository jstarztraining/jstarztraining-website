import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CoachForm } from '@/components/admin/coaches/CoachForm';

export default function NewCoachPage() {
  return (
    <div>
      <AdminPageHeader title="New coach" backHref="/admin/coaches" backLabel="Coaches" />
      <CoachForm />
    </div>
  );
}
