import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ProgramForm } from '@/components/admin/programs/ProgramForm';

export default function NewProgramPage() {
  return (
    <div>
      <AdminPageHeader
        title="New program"
        backHref="/admin/programs"
        backLabel="Programs"
      />
      <ProgramForm />
    </div>
  );
}
