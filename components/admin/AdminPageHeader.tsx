import Link from 'next/link';
import type { ReactNode } from 'react';

export function AdminPageHeader({
  title,
  description,
  backHref,
  backLabel,
  action,
}: {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8">
      {backHref ? (
        <Link
          href={backHref}
          className="text-sm font-medium text-ink/55 transition-colors hover:text-brand"
        >
          ← {backLabel ?? 'Back'}
        </Link>
      ) : null}
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight text-navy">{title}</h1>
          {description ? <p className="mt-2 max-w-xl text-ink/65">{description}</p> : null}
        </div>
        {action}
      </div>
    </div>
  );
}
