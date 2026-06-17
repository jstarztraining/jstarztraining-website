import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Container({
  children,
  className,
  as,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const Tag = as ?? 'div';
  return <Tag className={cn('container-px', className)}>{children}</Tag>;
}
