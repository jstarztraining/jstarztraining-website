'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import type { Coach } from '@prisma/client';
import { saveCoach } from '@/lib/actions/coaches';
import type { FormState } from '@/lib/form-state';
import {
  inputCls,
  labelCls,
  FieldError,
  FormError,
  FormActions,
  ActiveCheckbox,
} from '@/components/admin/form-ui';
import { ImageUploader } from '@/components/admin/ImageUploader';

export function CoachForm({ coach }: { coach?: Coach }) {
  const editing = Boolean(coach);
  const [state, formAction] = useFormState<FormState, FormData>(saveCoach, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {editing ? <input type="hidden" name="id" value={coach!.id} /> : null}
      <FormError message={state.error} />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input id="name" name="name" defaultValue={coach?.name ?? ''} className={inputCls} placeholder="Jordan Ellis" />
          <FieldError message={state.fieldErrors?.name} />
        </div>
        <div>
          <label htmlFor="role" className={labelCls}>
            Role
          </label>
          <input id="role" name="role" defaultValue={coach?.role ?? ''} className={inputCls} placeholder="Founder & Head Coach" />
          <FieldError message={state.fieldErrors?.role} />
        </div>
      </div>

      <div>
        <label htmlFor="bio" className={labelCls}>
          Bio
        </label>
        <textarea id="bio" name="bio" defaultValue={coach?.bio ?? ''} rows={5} className={inputCls} placeholder="A short background and coaching philosophy." />
        <FieldError message={state.fieldErrors?.bio} />
      </div>

      <div>
        <span className={labelCls}>
          Photo <span className="font-normal text-ink/50">(optional)</span>
        </span>
        <div className="mt-2">
          <ImageUploader
            name="imageUrl"
            defaultValue={coach?.imageUrl ?? ''}
            folder="coaches"
            previewClassName="h-44 w-36"
          />
        </div>
        <FieldError message={state.fieldErrors?.imageUrl} />
      </div>

      <ActiveCheckbox defaultChecked={coach ? coach.isActive : true} />

      <div className="flex items-center gap-3 border-t border-navy/10 pt-6">
        <FormActions editing={editing} entity="coach" />
        <Link href="/admin/coaches" className="inline-flex h-11 items-center rounded-full px-5 font-heading font-semibold text-ink/70 transition-colors hover:text-navy">
          Cancel
        </Link>
      </div>
    </form>
  );
}
