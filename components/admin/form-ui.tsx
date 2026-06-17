'use client';

import { useFormStatus } from 'react-dom';

export const inputCls =
  'mt-2 w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-navy outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/25';
export const labelCls = 'block text-sm font-semibold text-navy';
export const errCls = 'mt-1.5 text-sm font-medium text-red-600';

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className={errCls}>{message}</p>;
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
      {message}
    </p>
  );
}

export function ActiveCheckbox({ defaultChecked }: { defaultChecked: boolean }) {
  return (
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        name="isActive"
        defaultChecked={defaultChecked}
        className="h-5 w-5 rounded border-navy/30 text-brand focus:ring-brand/30"
      />
      <span className="text-sm font-medium text-navy">
        Visible <span className="font-normal text-ink/55">(shown on the site)</span>
      </span>
    </label>
  );
}

export function FormActions({ editing, entity }: { editing: boolean; entity: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 items-center justify-center rounded-full bg-gold px-6 font-heading font-semibold text-navy transition-all duration-300 ease-out-quint hover:bg-gold-soft disabled:opacity-60"
    >
      {pending ? 'Saving…' : editing ? 'Save changes' : `Create ${entity}`}
    </button>
  );
}
