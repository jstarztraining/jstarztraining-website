'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import type { Session } from '@prisma/client';
import { saveSession } from '@/lib/actions/sessions';
import type { FormState } from '@/lib/form-state';
import { inputCls, labelCls, FieldError, FormError, FormActions } from '@/components/admin/form-ui';

function toLocalInput(d?: Date | null) {
  if (!d) return '';
  const date = new Date(d);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function SessionForm({
  session,
  programs,
}: {
  session?: Session;
  programs: { id: string; title: string }[];
}) {
  const editing = Boolean(session);
  const [state, formAction] = useFormState<FormState, FormData>(saveSession, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {editing ? <input type="hidden" name="id" value={session!.id} /> : null}
      <FormError message={state.error} />

      <div>
        <label htmlFor="title" className={labelCls}>
          Title
        </label>
        <input id="title" name="title" defaultValue={session?.title ?? ''} className={inputCls} placeholder="U9 Player Development" />
        <FieldError message={state.fieldErrors?.title} />
      </div>

      <div>
        <label htmlFor="programId" className={labelCls}>
          Linked program <span className="font-normal text-ink/50">(optional)</span>
        </label>
        <select id="programId" name="programId" defaultValue={session?.programId ?? ''} className={inputCls}>
          <option value="">— None —</option>
          {programs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="startsAt" className={labelCls}>
            Starts
          </label>
          <input
            id="startsAt"
            name="startsAt"
            type="datetime-local"
            defaultValue={toLocalInput(session?.startsAt)}
            className={inputCls}
          />
          <FieldError message={state.fieldErrors?.startsAt} />
        </div>
        <div>
          <label htmlFor="endsAt" className={labelCls}>
            Ends <span className="font-normal text-ink/50">(optional)</span>
          </label>
          <input
            id="endsAt"
            name="endsAt"
            type="datetime-local"
            defaultValue={toLocalInput(session?.endsAt)}
            className={inputCls}
          />
          <FieldError message={state.fieldErrors?.endsAt} />
        </div>
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="allDay"
          defaultChecked={session?.allDay ?? false}
          className="h-5 w-5 rounded border-navy/30 text-brand focus:ring-brand/30"
        />
        <span className="text-sm font-medium text-navy">All-day session</span>
      </label>

      <div>
        <label htmlFor="location" className={labelCls}>
          Location
        </label>
        <input id="location" name="location" defaultValue={session?.location ?? ''} className={inputCls} placeholder="BMO Soccer Centre" />
      </div>

      <div>
        <label htmlFor="notes" className={labelCls}>
          Notes <span className="font-normal text-ink/50">(optional)</span>
        </label>
        <textarea id="notes" name="notes" defaultValue={session?.notes ?? ''} rows={2} className={inputCls} placeholder="1st hour · Ages 6–9" />
      </div>

      <div className="flex items-center gap-3 border-t border-navy/10 pt-6">
        <FormActions editing={editing} entity="session" />
        <Link href="/admin/schedule" className="inline-flex h-11 items-center rounded-full px-5 font-heading font-semibold text-ink/70 transition-colors hover:text-navy">
          Cancel
        </Link>
      </div>
    </form>
  );
}
