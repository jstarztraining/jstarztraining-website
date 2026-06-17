import { cn } from '@/lib/utils';

/**
 * Placeholder crest — a circular blue-gradient badge with a gold ring and star,
 * standing in for JStarz's real circular logo crest until the asset is supplied
 * (§9). Decorative; the wordmark carries the accessible name.
 */
export function Crest({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn('h-full w-full', className)}
      role="img"
      aria-label="JStarz crest"
    >
      <defs>
        <radialGradient id="crestBg" cx="50%" cy="32%" r="80%">
          <stop offset="0%" stopColor="#2f8bf0" />
          <stop offset="55%" stopColor="#1158c4" />
          <stop offset="100%" stopColor="#06183f" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="31" fill="url(#crestBg)" />
      <circle cx="32" cy="32" r="29.5" fill="none" stroke="#e6b945" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="24" fill="none" stroke="#e6b945" strokeOpacity="0.35" strokeWidth="1" />
      {/* Star */}
      <path
        d="M32 15.5l2.9 6.1 6.7.8-4.95 4.6 1.3 6.6L32 31.1l-5.95 2.5 1.3-6.6L22.4 22.4l6.7-.8z"
        fill="#f4d889"
      />
      {/* Wordmark mark */}
      <text
        x="32"
        y="48.5"
        textAnchor="middle"
        fontFamily="var(--font-display), sans-serif"
        fontWeight="800"
        fontSize="13"
        letterSpacing="0.5"
        fill="#ffffff"
      >
        JS
      </text>
    </svg>
  );
}
