// v5.0: slate, emerald and teal resolve to CSS channels defined per colour theme in
// src/index.css (:root and :root[data-theme=…]), so switching theme re-skins every
// utility — including opacity modifiers like bg-emerald-500/20 — without touching markup.
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const themed = (name) => Object.fromEntries(STEPS.map((k) => [k, `rgb(var(--${name}-${k}) / <alpha-value>)`]));
const sl = (k) => `rgb(var(--sl-${k}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: themed('slate'),
        emerald: themed('emerald'),
        teal: themed('teal'),
        nature: {
          sky: {
            DEFAULT: '#0284C7',
            50: '#F0F9FF',
            100: '#E0F2FE',
            200: '#BAE6FD',
            300: '#7DD3FC',
            400: '#38BDF8',
            500: '#0EA5E9',
            600: '#0284C7',
            700: '#0369A1',
            800: '#075985',
            900: '#0C4A6E',
          },
          green: {
            DEFAULT: '#16A34A',
            50: '#F0FDF4',
            100: '#DCFCE7',
            200: '#BBF7D0',
            300: '#86EFAC',
            400: '#4ADE80',
            500: '#22C55E',
            600: '#16A34A',
            700: '#15803D',
            800: '#166534',
            900: '#14532D',
          },
          amber: {
            DEFAULT: '#D97706',
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
            800: '#92400E',
          },
          sage: {
            DEFAULT: '#0D9488',
            50: '#F0FDFA',
            100: '#CCFBF1',
            200: '#99F6E4',
            300: '#5EEAD4',
            400: '#2DD4BF',
            500: '#14B8A6',
            600: '#0D9488',
            700: '#0F766E',
          }
        },
        salud: {
          dark: {
            bg: '#0A110E',
            surface: '#101B15',
            card: '#15231C',
            cardSubtle: '#1A2D23',
            border: '#1E3429',
            borderHover: '#2E5240',
            muted: '#95A8A0',
            text: '#F1F6F3',
          },
          light: {
            bg: sl('bg'),
            surface: sl('surface'),
            card: sl('card'),
            cardSubtle: sl('cardSubtle'),
            border: sl('border'),
            borderHover: sl('borderHover'),
            muted: sl('muted'),
            text: sl('text'),
          },
          green: {
            DEFAULT: 'rgb(var(--emerald-500) / <alpha-value>)',
            50: 'rgb(var(--emerald-50) / <alpha-value>)',
            100: 'rgb(var(--emerald-100) / <alpha-value>)',
            200: 'rgb(var(--emerald-200) / <alpha-value>)',
            300: 'rgb(var(--emerald-300) / <alpha-value>)',
            400: 'rgb(var(--emerald-400) / <alpha-value>)',
            500: 'rgb(var(--emerald-500) / <alpha-value>)',
            600: 'rgb(var(--emerald-600) / <alpha-value>)',
            700: 'rgb(var(--emerald-700) / <alpha-value>)',
            800: 'rgb(var(--emerald-800) / <alpha-value>)',
            900: 'rgb(var(--emerald-900) / <alpha-value>)',
            glow: 'rgba(16, 185, 129, 0.22)',
          },
          pastel: {
            DEFAULT: '#D1FAE5',
            50: '#F0FDF4',
            100: '#ECFDF5',
            200: '#A7F3D0',
            border: '#A7F3D0',
            text: '#065F46',
          },
          amber: {
            DEFAULT: '#F59E0B',
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
            glow: 'rgba(245, 158, 11, 0.22)',
          },
          coral: {
            DEFAULT: '#FB923C',
            400: '#FB923C',
            500: '#F97316',
            glow: 'rgba(251, 146, 60, 0.25)',
          },
          cyan: {
            DEFAULT: '#0284C7',
            300: '#7DD3FC',
            400: '#38BDF8',
            500: '#0EA5E9',
            600: '#0284C7',
            700: '#0369A1',
            glow: 'rgba(2, 132, 199, 0.22)',
          },
          emerald: {
            DEFAULT: 'rgb(var(--emerald-500) / <alpha-value>)',
            50: 'rgb(var(--emerald-50) / <alpha-value>)',
            100: 'rgb(var(--emerald-100) / <alpha-value>)',
            200: 'rgb(var(--emerald-200) / <alpha-value>)',
            300: 'rgb(var(--emerald-300) / <alpha-value>)',
            400: 'rgb(var(--emerald-400) / <alpha-value>)',
            500: 'rgb(var(--emerald-500) / <alpha-value>)',
            600: 'rgb(var(--emerald-600) / <alpha-value>)',
            700: 'rgb(var(--emerald-700) / <alpha-value>)',
            glow: 'rgba(16, 185, 129, 0.22)',
          },
          crimson: {
            DEFAULT: '#EF4444',
            400: '#F87171',
            500: '#EF4444',
            glow: 'rgba(239, 68, 68, 0.22)',
          }
        }
      },
      // v4.0: every stack falls back to a CJK sans face. Before this, Chinese glyphs in
      // `font-mono` / `font-display` fell through to the OS default (a Ming serif on
      // Windows), so labels rendered in two unrelated typefaces.
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans TC"', '"PingFang TC"', '"Microsoft JhengHei"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Noto Sans TC"', '"PingFang TC"', '"Microsoft JhengHei"', 'Menlo', 'Consolas', 'monospace'],
        display: ['"Space Grotesk"', '"Noto Sans TC"', '"PingFang TC"', '"Microsoft JhengHei"', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.22s ease-out both',
        'slide-in-left': 'slide-in-left 0.22s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      boxShadow: {
        'mint-glow': '0 0 25px -5px rgba(52, 211, 153, 0.25)',
        'emerald-glow': '0 0 25px -5px rgba(16, 185, 129, 0.22)',
        'warm-glow': '0 0 25px -5px rgba(245, 158, 11, 0.18)',
        'cyan-glow': '0 0 25px -5px rgba(2, 132, 199, 0.20)',
        'green-glow': '0 0 25px -5px rgba(16, 185, 129, 0.22)',
        'crimson-glow': '0 0 25px -5px rgba(239, 68, 68, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('light', [':is(.light &)', '.light &']);
    },
  ],
}
