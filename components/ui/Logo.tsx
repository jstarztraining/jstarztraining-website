import Link from 'next/link';
import { Crest } from './Crest';
import { cn } from '@/lib/utils';

export function Logo({
  className,
  dark = false,
  size = 'md',
}: {
  className?: string;
  /** dark=true → light text for use over the navy hero. */
  dark?: boolean;
  size?: 'md' | 'lg';
}) {
  const lg = size === 'lg';
  return (
    <Link
      href="/"
      aria-label="JStarz Training — home"
      className={cn('group inline-flex items-center', lg ? 'gap-3.5' : 'gap-3', className)}
    >
      <span
        className={cn(
          'block shrink-0 transition-transform duration-500 ease-out-quint group-hover:rotate-[8deg]',
          lg ? 'h-16 w-16' : 'h-11 w-11',
        )}
      >
        <Crest />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display font-black tracking-tightest',
            lg ? 'text-[1.7rem]' : 'text-xl',
            dark ? 'text-white' : 'text-navy',
          )}
        >
          JStarz
        </span>
        <span
          className={cn(
            'mt-1 font-semibold uppercase tracking-[0.2em]',
            lg ? 'text-[0.72rem]' : 'text-[0.64rem]',
            dark ? 'text-gold-soft' : 'text-gold-deep',
          )}
        >
          Soccer Training
        </span>
      </span>
    </Link>
  );
}
