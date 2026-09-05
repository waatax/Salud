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
            bg: '#090D16',
            surface: '#111827',
            card: '#151F32',
            border: '#1E293B',
            borderHover: '#334155',
            muted: '#94A3B8',
            text: '#F8FAFC',
          },
          light: {
            bg: '#FAF9F6',
            surface: '#FFFFFF',
            card: '#F5F2EB',
            border: '#E5DFD7',
            borderHover: '#CBD5E1',
            muted: '#64748B',
            text: '#1E293B',
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
            DEFAULT: '#16A34A',
            400: '#4ADE80',
            500: '#22C55E',
            600: '#16A34A',
          },
          crimson: {
            DEFAULT: '#EF4444',
            400: '#F87171',
            500: '#EF4444',
            glow: 'rgba(239, 68, 68, 0.22)',
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Consolas', 'monospace'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'warm-glow': '0 0 25px -5px rgba(245, 158, 11, 0.18)',
        'cyan-glow': '0 0 25px -5px rgba(2, 132, 199, 0.20)',
        'green-glow': '0 0 25px -5px rgba(22, 163, 74, 0.20)',
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
