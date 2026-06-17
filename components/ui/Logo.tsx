import Link from 'next/link';
import { Crest } from './Crest';
import { cn } from '@/lib/utils';

export function Logo({
  className,
  dark = false,
}: {
  className?: string;
  /** dark=true → light text for use over the navy hero. */
  dark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="JStarz Training — home"
      className={cn('group inline-flex items-center gap-3', className)}
    >
      <span className="block h-10 w-10 shrink-0 transition-transform duration-500 ease-out-quint group-hover:rotate-[8deg]">
        <Crest />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-lg font-extrabold tracking-tightest',
            dark ? 'text-white' : 'text-navy',
          )}
        >
          JStarz
        </span>
        <span
          className={cn(
            'mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em]',
            dark ? 'text-gold-soft' : 'text-gold-deep',
          )}
        >
          Soccer Training
        </span>
      </span>
    </Link>
  );
}
