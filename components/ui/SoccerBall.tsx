import { cn } from '@/lib/utils';

/** Decorative soccer ball SVG for the hero. Pure transform animation (GPU-light). */
export function SoccerBall({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="ballShade" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#eef2f9" />
          <stop offset="100%" stopColor="#c7d2e6" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="92" fill="url(#ballShade)" />
      <circle cx="100" cy="100" r="92" fill="none" stroke="#0a2a63" strokeOpacity="0.15" strokeWidth="2" />
      <g fill="#06183f">
        {/* Central pentagon */}
        <polygon points="100,72 124,90 115,118 85,118 76,90" />
        {/* Outer pentagons */}
        <polygon points="100,20 116,33 108,52 92,52 84,33" opacity="0.92" />
        <polygon points="168,72 174,95 156,108 140,92 150,70" opacity="0.92" />
        <polygon points="148,168 126,160 130,138 152,138 160,158" opacity="0.92" />
        <polygon points="52,168 74,160 70,138 48,138 40,158" opacity="0.92" />
        <polygon points="32,72 26,95 44,108 60,92 50,70" opacity="0.92" />
      </g>
      <g stroke="#0a2a63" strokeOpacity="0.55" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <line x1="100" y1="52" x2="100" y2="72" />
        <line x1="140" y1="92" x2="124" y2="90" />
        <line x1="130" y1="138" x2="115" y2="118" />
        <line x1="70" y1="138" x2="85" y2="118" />
        <line x1="60" y1="92" x2="76" y2="90" />
      </g>
    </svg>
  );
}
