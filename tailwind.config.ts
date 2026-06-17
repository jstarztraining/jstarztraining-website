import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // JStarz crest brand — working placeholders from the approved hero concept.
        // Refine to exact logo hex when the real crest drops in (§9, outstanding).
        brand: {
          bright: '#1f7ae0',
          DEFAULT: '#1158c4',
          deep: '#0a2a63',
        },
        navy: '#06183f',
        ink: '#0a1430',
        gold: {
          soft: '#f4d889',
          DEFAULT: '#e6b945',
          deep: '#b98a1f',
        },
        // Light surfaces, faintly tinted toward the brand blue (not warm-by-default).
        mist: '#f4f6fb',
        cloud: '#eaeefa',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        prose: '68ch',
      },
      zIndex: {
        nav: '50',
        'nav-menu': '60',
        modal: '70',
        toast: '80',
      },
      transitionTimingFunction: {
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10, 20, 48, 0.04), 0 12px 32px -12px rgba(10, 42, 99, 0.18)',
        'card-hover': '0 2px 4px rgba(10, 20, 48, 0.06), 0 28px 56px -20px rgba(17, 88, 196, 0.32)',
        glow: '0 0 0 1px rgba(230, 185, 69, 0.4), 0 18px 50px -12px rgba(230, 185, 69, 0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(-4deg)' },
          '50%': { transform: 'translateY(-22px) rotate(4deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%': { transform: 'translate3d(6%, -4%, 0) scale(1.08)' },
          '66%': { transform: 'translate3d(-5%, 5%, 0) scale(0.96)' },
        },
        'underline-swipe': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-cue': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '40%': { opacity: '1' },
          '80%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        drift: 'drift 22s ease-in-out infinite',
        'underline-swipe': 'underline-swipe 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards',
        marquee: 'marquee 40s linear infinite',
        'scroll-cue': 'scroll-cue 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
