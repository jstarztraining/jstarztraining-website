import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost' | 'ghost-dark' | 'subtle';
type Size = 'md' | 'lg';

const base =
  'group/btn inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold tracking-tight ' +
  'transition-all duration-300 ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap';

const variants: Record<Variant, string> = {
  // Gold pill — primary brand CTA.
  primary:
    'bg-gold text-navy shadow-[0_10px_30px_-10px_rgba(230,185,69,0.7)] hover:bg-gold-soft ' +
    'hover:shadow-[0_16px_40px_-12px_rgba(230,185,69,0.85)] hover:-translate-y-0.5 active:translate-y-0',
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
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
