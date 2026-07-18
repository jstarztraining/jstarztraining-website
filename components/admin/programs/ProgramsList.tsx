'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import type { Program } from '@prisma/client';
import { reorderPrograms, toggleProgramActive, deleteProgram } from '@/lib/actions/programs';
import { cn } from '@/lib/utils';
import { VisibilityToggle } from '@/components/admin/VisibilityToggle';

export function ProgramsList({ programs }: { programs: Program[] }) {
  const [items, setItems] = useState(programs);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState('');

  /**
   * Optimistic updates hide server failures — a rejected action looked exactly like
   * a successful one until reload. Snapshot, restore on failure, and surface it.
   */
  function persist(optimistic: Program[], action: () => Promise<void>, what: string) {
    const snapshot = items;
    setError('');
    setItems(optimistic);
    startTransition(() => {
      action().catch(() => {
        setItems(snapshot);
        setBusyId(null);
        setError(`Couldn’t save ${what}. Check your connection and try again.`);
      });
    });
  }

  function persistOrder(next: Program[]) {
    persist(next, () => reorderPrograms(next.map((p) => p.id)), 'the new order');
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

  function onToggle(program: Program) {
    const nextActive = !program.isActive;
    const next = items.map((p) => (p.id === program.id ? { ...p, isActive: nextActive } : p));
    persist(next, () => toggleProgramActive(program.id, nextActive), `“${program.title}”`);
  }

  function onDelete(program: Program) {
    if (!confirm(`Delete “${program.title}”? This can’t be undone.`)) return;
    setBusyId(program.id);
    persist(
      items.filter((p) => p.id !== program.id),
      () => deleteProgram(program.id),
      `the deletion of “${program.title}”`,
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-navy/20 bg-white p-12 text-center">
        <p className="text-ink/60">No programs yet.</p>
        <Link
          href="/admin/programs/new"
          className="mt-4 inline-flex h-11 items-center rounded-full bg-gold px-6 font-heading font-semibold text-navy hover:bg-gold-soft"
        >
          Add your first program
        </Link>
      </div>
    );
  }

  return (
    <>
      {error ? (
        <p
          role="alert"
          className="mb-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {error}
        </p>
      ) : null}
      <ul className="space-y-2">
        {items.map((program, i) => (
        <li
          key={program.id}
          draggable
          onDragStart={() => setDragIndex(i)}
          onDragOver={(e) => onDragOver(e, i)}
          onDragEnd={() => {
            setDragIndex(null);
            persistOrder(items);
          }}
          className={cn(
            'flex items-center gap-3 rounded-2xl border border-navy/10 bg-white p-3 shadow-card transition-shadow sm:gap-4 sm:p-4',
            dragIndex === i && 'opacity-60 ring-2 ring-brand/40',
            busyId === program.id && 'pointer-events-none opacity-50',
          )}
        >
          {/* Drag handle + keyboard reorder */}
          <div className="flex flex-col items-center text-ink/40">
            <span aria-hidden className="cursor-grab select-none text-lg leading-none active:cursor-grabbing">
              ⠿
            </span>
          </div>
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

          {/* Thumbnail */}
          <div className="hidden h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-mist sm:block">
            {program.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={program.imageUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-brand-deep to-navy" />
            )}
          </div>

          {/* Title + price */}
          <div className="min-w-0 flex-1">
            <p className="truncate font-heading font-semibold text-navy">{program.title}</p>
            <p className="text-sm text-ink/55">{program.priceDisplay}</p>
          </div>

          {/* Active toggle */}
          <VisibilityToggle active={program.isActive} onToggle={() => onToggle(program)} />

          {/* Divider keeps the switch from crowding the actions */}
          <span aria-hidden className="hidden h-7 w-px shrink-0 bg-navy/10 sm:block" />

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Link
              href={`/admin/programs/${program.id}`}
              className="rounded-full border border-navy/15 px-4 py-1.5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => onDelete(program)}
              aria-label={`Delete ${program.title}`}
              className="rounded-full px-2.5 py-1.5 text-sm font-semibold text-ink/40 transition-colors hover:text-red-600"
            >
              Delete
            </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
