'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { deleteSession } from '@/lib/actions/sessions';
import { cn } from '@/lib/utils';

export interface SessionRow {
  id: string;
  title: string;
  whenLabel: string;
  location: string | null;
  notes: string | null;
}

export function SessionsList({ rows }: { rows: SessionRow[] }) {
  const [items, setItems] = useState(rows);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function onDelete(row: SessionRow) {
    if (!confirm(`Delete “${row.title}”? This can’t be undone.`)) return;
    setBusyId(row.id);
    setItems((cur) => cur.filter((r) => r.id !== row.id));
    startTransition(() => deleteSession(row.id));
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-navy/20 bg-white p-12 text-center">
        <p className="text-ink/60">No sessions yet.</p>
        <Link
          href="/admin/schedule/new"
          className="mt-4 inline-flex h-11 items-center rounded-full bg-gold px-6 font-heading font-semibold text-navy hover:bg-gold-soft"
        >
          Add your first session
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((row) => (
        <li
          key={row.id}
          className={cn(
            'flex items-center gap-4 rounded-2xl border border-navy/10 bg-white p-4 shadow-card',
            busyId === row.id && 'pointer-events-none opacity-50',
          )}
        >
          <div className="min-w-0 flex-1">
            <p className="truncate font-heading font-semibold text-navy">{row.title}</p>
            <p className="truncate text-sm text-ink/55">
              {row.whenLabel}
              {row.location ? ` · ${row.location}` : ''}
              {row.notes ? ` · ${row.notes}` : ''}
            </p>
          </div>
          <Link
            href={`/admin/schedule/${row.id}`}
            className="shrink-0 rounded-full border border-navy/15 px-4 py-1.5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={() => onDelete(row)}
            aria-label={`Delete ${row.title}`}
            className="shrink-0 rounded-full px-2.5 py-1.5 text-sm font-semibold text-ink/40 transition-colors hover:text-red-600"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
