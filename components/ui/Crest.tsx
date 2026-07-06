import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * JStarz's real circular crest (§9) — gold crown, "J-ST★RZ SOCCER TRAINING" ring,
 * player silhouette + ball on a blue gradient. Masked to a circle so it reads as
 * a clean badge. Decorative; the wordmark carries the accessible name.
 */
export function Crest({ className }: { className?: string }) {
  return (
    <Image
      src="/jstarz-crest.jpg"
      alt=""
      width={96}
      height={96}
      priority
      className={cn('h-full w-full rounded-full object-cover', className)}
    />
  );
}
