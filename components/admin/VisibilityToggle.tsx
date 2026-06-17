'use client';

import { cn } from '@/lib/utils';

/**
 * Show/hide switch used across dashboard lists. Gold track + navy knob when on
 * (high contrast against the blue admin UI), light track + white knob when off.
 */
export function VisibilityToggle({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={cn(
          'hidden text-xs font-bold uppercase tracking-wide sm:inline',
          active ? 'text-gold-deep' : 'text-ink/40',
        )}
      >
        {active ? 'Visible' : 'Hidden'}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={active}
        aria-label={active ? 'Visible on site — click to hide' : 'Hidden — click to show'}
        onClick={onToggle}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200',
          active ? 'bg-gold' : 'bg-navy/15 ring-1 ring-inset ring-navy/20',
        )}
      >
        <span
          className={cn(
            'inline-block h-5 w-5 transform rounded-full shadow-sm transition-transform duration-200',
            active ? 'translate-x-[1.375rem] bg-navy' : 'translate-x-0.5 bg-white ring-1 ring-navy/20',
          )}
        />
      </button>
    </div>
  );
}
