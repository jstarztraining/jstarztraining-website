'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { VisibilityToggle } from '@/components/admin/VisibilityToggle';

export interface AdminRow {
  id: string;
  isActive: boolean;
  primary: string;
  secondary?: string;
  thumbUrl?: string | null;
  /** When true, a thumbnail slot is reserved even if thumbUrl is empty. */
  showThumb?: boolean;
}

interface Props {
  rows: AdminRow[];
  editHrefBase: string; // e.g. "/admin/coaches" -> "/admin/coaches/<id>"
  newHref: string;
  entityLabel: string; // singular, e.g. "coach"
  actions: {
    reorder: (orderedIds: string[]) => Promise<void>;
    toggle: (id: string, isActive: boolean) => Promise<void>;
    remove: (id: string) => Promise<void>;
  };
}

export function SortableAdminList({ rows, editHrefBase, newHref, entityLabel, actions }: Props) {
  const [items, setItems] = useState(rows);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function persistOrder(next: AdminRow[]) {
    setItems(next);
    startTransition(() => actions.reorder(next.map((r) => r.id)));
  }

  function move(from: number, to: number) {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    persistOrder(next);
  }

  function onDragOver(e: React.DragEvent, overIndex: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === overIndex) return;
    const next = [...items];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(overIndex, 0, moved);
    setItems(next);
    setDragIndex(overIndex);
  }

  function onToggle(row: AdminRow) {
    const nextActive = !row.isActive;
    setItems((cur) => cur.map((r) => (r.id === row.id ? { ...r, isActive: nextActive } : r)));
    startTransition(() => actions.toggle(row.id, nextActive));
  }

  function onDelete(row: AdminRow) {
    if (!confirm(`Delete “${row.primary}”? This can’t be undone.`)) return;
    setBusyId(row.id);
    setItems((cur) => cur.filter((r) => r.id !== row.id));
    startTransition(() => actions.remove(row.id));
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-navy/20 bg-white p-12 text-center">
        <p className="text-ink/60">No {entityLabel}s yet.</p>
        <Link
          href={newHref}
          className="mt-4 inline-flex h-11 items-center rounded-full bg-gold px-6 font-heading font-semibold text-navy hover:bg-gold-soft"
        >
          Add your first {entityLabel}
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((row, i) => (
        <li
          key={row.id}
          draggable
          onDragStart={() => setDragIndex(i)}
          onDragOver={(e) => onDragOver(e, i)}
          onDragEnd={() => {
            setDragIndex(null);
            persistOrder(items);
          }}
          className={cn(
            'flex items-center gap-3 rounded-2xl border border-navy/10 bg-white p-3 shadow-card sm:gap-4 sm:p-4',
            dragIndex === i && 'opacity-60 ring-2 ring-brand/40',
            busyId === row.id && 'pointer-events-none opacity-50',
          )}
        >
          <span aria-hidden className="cursor-grab select-none text-lg leading-none text-ink/40 active:cursor-grabbing">
            ⠿
          </span>
          <div className="flex flex-col">
            <button
              type="button"
              aria-label="Move up"
              onClick={() => move(i, i - 1)}
              disabled={i === 0}
              className="text-ink/40 transition-colors hover:text-brand disabled:opacity-30"
            >
              ▲
            </button>
            <button
              type="button"
              aria-label="Move down"
              onClick={() => move(i, i + 1)}
              disabled={i === items.length - 1}
              className="text-ink/40 transition-colors hover:text-brand disabled:opacity-30"
            >
              ▼
            </button>
          </div>

          {row.showThumb ? (
            <div className="hidden h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-mist sm:block">
              {row.thumbUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={row.thumbUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-brand-deep to-navy" />
              )}
            </div>
          ) : null}

          <div className="min-w-0 flex-1">
            <p className="truncate font-heading font-semibold text-navy">{row.primary}</p>
            {row.secondary ? <p className="truncate text-sm text-ink/55">{row.secondary}</p> : null}
          </div>

          <VisibilityToggle active={row.isActive} onToggle={() => onToggle(row)} />

          <span aria-hidden className="hidden h-7 w-px shrink-0 bg-navy/10 sm:block" />

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Link
              href={`${editHrefBase}/${row.id}`}
              className="rounded-full border border-navy/15 px-4 py-1.5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => onDelete(row)}
              aria-label={`Delete ${row.primary}`}
              className="rounded-full px-2.5 py-1.5 text-sm font-semibold text-ink/40 transition-colors hover:text-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
