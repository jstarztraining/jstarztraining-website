'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import type { Session } from '@prisma/client';
import { saveSession } from '@/lib/actions/sessions';
import { WEEKDAY_OPTIONS, weeklyParts } from '@/lib/schedule';
import type { FormState } from '@/lib/form-state';
import { inputCls, labelCls, FieldError, FormError, FormActions } from '@/components/admin/form-ui';

export function SessionForm({
  session,
  programs,
}: {
  session?: Session;
  programs: { id: string; title: string }[];
}) {
  const editing = Boolean(session);
  const [state, formAction] = useFormState<FormState, FormData>(saveSession, {});
  const [allDay, setAllDay] = useState(session?.allDay ?? false);

  // The board is a repeating weekly view, so a session is stored as a weekday +
  // time of day (Halifax time) rather than a one-off calendar date.
  const start = session ? weeklyParts(session.startsAt) : null;
  const end = session?.endsAt ? weeklyParts(session.endsAt) : null;

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

      <div>
        <label htmlFor="weekday" className={labelCls}>
          Day of the week
        </label>
        <select id="weekday" name="weekday" defaultValue={String(start?.weekday ?? 5)} className={inputCls}>
          {WEEKDAY_OPTIONS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        <p className="mt-1.5 text-xs text-ink/50">
          The schedule board repeats every week — a session set to Sunday shows on{' '}
          <span className="font-medium text-ink/70">every</span> Sunday, not one specific date.
        </p>
        <FieldError message={state.fieldErrors?.weekday} />
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="allDay"
          checked={allDay}
          onChange={(e) => setAllDay(e.target.checked)}
          className="h-5 w-5 rounded border-navy/30 text-brand focus:ring-brand/30"
        />
        <span className="text-sm font-medium text-navy">
          All-day session <span className="font-normal text-ink/55">(no set start and end time)</span>
        </span>
      </label>

      <div className={allDay ? 'pointer-events-none opacity-50' : ''}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="startsAt" className={labelCls}>
              Start time
            </label>
            <input
              id="startsAt"
              name="startsAt"
              type="time"
              defaultValue={start?.time ?? ''}
              className={inputCls}
            />
            <FieldError message={state.fieldErrors?.startsAt} />
          </div>
          <div>
            <label htmlFor="endsAt" className={labelCls}>
              End time <span className="font-normal text-ink/50">(optional)</span>
            </label>
            <input
              id="endsAt"
              name="endsAt"
              type="time"
              defaultValue={end?.time ?? ''}
              className={inputCls}
            />
            <FieldError message={state.fieldErrors?.endsAt} />
          </div>
        </div>
        <p className="mt-2 text-xs text-ink/50">Times are Halifax time — exactly what visitors see on the board.</p>
      </div>

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
