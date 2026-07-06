import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'glow' | 'ghost' | 'ghost-dark' | 'subtle';
type Size = 'md' | 'lg';

const base =
  'group/btn inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold tracking-tight ' +
  'transition-all duration-300 ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap';

const variants: Record<Variant, string> = {
  // Gold pill — primary brand CTA. `relative overflow-hidden` clips the sheen
  // sweep (see Sheen below); box-shadow and focus outline render outside the box
  // so they're unaffected by the clip.
  primary:
    'relative overflow-hidden bg-gold text-navy shadow-[0_10px_30px_-10px_rgba(230,185,69,0.7)] hover:bg-gold-soft ' +
    'hover:shadow-[0_16px_40px_-12px_rgba(230,185,69,0.85)] hover:-translate-y-0.5 active:translate-y-0',
  // Dark gradient pill with a glowing gold accent — for gold-on-navy contexts
  // where a solid-gold pill would be too heavy (e.g. the floodlit hero).
  glow:
    'bg-gradient-to-b from-brand-deep to-navy text-gold-soft ring-1 ring-inset ring-gold-soft/30 ' +
    'shadow-[0_0_28px_-2px_rgba(230,185,69,0.55)] hover:-translate-y-0.5 hover:ring-gold-soft/60 ' +
    'hover:shadow-[0_0_46px_0_rgba(230,185,69,0.8)] active:translate-y-0',
  // Ghost on dark (hero, navy sections).
  ghost:
    'border border-white/30 text-white hover:border-gold hover:text-gold hover:bg-white/5 backdrop-blur-sm',
  // Ghost on light.
  'ghost-dark':
    'border border-navy/20 text-navy hover:border-brand hover:text-brand hover:bg-brand/5',
  subtle:
    'bg-navy text-white hover:bg-brand-deep hover:-translate-y-0.5 active:translate-y-0 shadow-card',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
};

// Diagonal light sheen that sweeps across the gold pill on hover. Primary only.
function Sheen() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-[420%] motion-reduce:hidden"
    />
  );
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentProps<typeof Link>, 'href' | 'className'>;

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<'button'>, 'className'> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const sheen = variant === 'primary' ? <Sheen /> : null;

  if ('href' in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    const external = href.startsWith('http');
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
        {sheen}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
      {sheen}
    </button>
  );
}
