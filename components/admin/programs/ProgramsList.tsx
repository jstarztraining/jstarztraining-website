'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import type { Program } from '@prisma/client';
import { reorderPrograms, toggleProgramActive, deleteProgram } from '@/lib/actions/programs';
import { cn } from '@/lib/utils';

export function ProgramsList({ programs }: { programs: Program[] }) {
  const [items, setItems] = useState(programs);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);

  function persistOrder(next: Program[]) {
    setItems(next);
    startTransition(() => reorderPrograms(next.map((p) => p.id)));
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
    setItems((cur) => cur.map((p) => (p.id === program.id ? { ...p, isActive: nextActive } : p)));
    startTransition(() => toggleProgramActive(program.id, nextActive));
  }

  function onDelete(program: Program) {
    if (!confirm(`Delete “${program.title}”? This can’t be undone.`)) return;
    setBusyId(program.id);
    setItems((cur) => cur.filter((p) => p.id !== program.id));
    startTransition(() => deleteProgram(program.id));
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
          <button
            type="button"
            role="switch"
            aria-checked={program.isActive}
            aria-label={program.isActive ? 'Active — click to hide' : 'Hidden — click to show'}
            onClick={() => onToggle(program)}
            className={cn(
              'relative h-6 w-11 shrink-0 rounded-full transition-colors',
              program.isActive ? 'bg-brand' : 'bg-navy/20',
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
                program.isActive ? 'translate-x-[22px]' : 'translate-x-0.5',
              )}
            />
          </button>

          {/* Actions */}
          <Link
            href={`/admin/programs/${program.id}`}
            className="shrink-0 rounded-full border border-navy/15 px-4 py-1.5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={() => onDelete(program)}
            aria-label={`Delete ${program.title}`}
            className="shrink-0 rounded-full px-2.5 py-1.5 text-sm font-semibold text-ink/40 transition-colors hover:text-red-600"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
