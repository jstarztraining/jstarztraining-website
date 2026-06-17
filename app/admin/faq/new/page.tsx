import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { FaqForm } from '@/components/admin/faq/FaqForm';

export default function NewFaqPage() {
  return (
    <div>
      <AdminPageHeader title="New question" backHref="/admin/faq" backLabel="FAQ" />
      <FaqForm />
    </div>
  );
}
