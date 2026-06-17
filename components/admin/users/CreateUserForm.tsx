'use client';

import { useFormState } from 'react-dom';
import { createUser } from '@/lib/actions/users';
import type { FormState } from '@/lib/form-state';
import { inputCls, labelCls, FieldError, FormError, FormActions } from '@/components/admin/form-ui';

export function CreateUserForm() {
  const [state, formAction] = useFormState<FormState, FormData>(createUser, {});

  return (
    <form action={formAction} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
      <h2 className="font-heading text-lg font-bold text-navy">Add an account</h2>
      <p className="mt-1 text-sm text-ink/60">Create an Admin or Editor. Share the starting password securely.</p>
      <FormError message={state.error} />

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input id="name" name="name" className={inputCls} placeholder="Full name" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input id="email" name="email" className={inputCls} placeholder="editor@example.com" />
          <FieldError message={state.fieldErrors?.email} />
        </div>
        <div>
          <label htmlFor="role" className={labelCls}>
            Role
          </label>
          <select id="role" name="role" defaultValue="Editor" className={inputCls}>
            <option value="Editor">Editor — edit all content</option>
            <option value="Admin">Admin — everything + manage users</option>
          </select>
          <FieldError message={state.fieldErrors?.role} />
        </div>
        <div>
          <label htmlFor="password" className={labelCls}>
            Starting password
          </label>
          <input id="password" name="password" type="text" className={inputCls} placeholder="At least 8 characters" />
          <FieldError message={state.fieldErrors?.password} />
        </div>
      </div>

      <div className="mt-6">
        <FormActions editing={false} entity="account" />
      </div>
    </form>
  );
}
