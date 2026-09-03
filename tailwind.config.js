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
        salud: {
          dark: {
            bg: '#090D16',
            surface: '#111827',
            card: '#151F32',
            border: '#1E293B',
            borderHover: '#334155',
            muted: '#64748B',
            text: '#F8FAFC',
          },
          light: {
            bg: '#FAF8F5',
            surface: '#FFFFFF',
            card: '#F4EFEA',
            border: '#E2D9CF',
            borderHover: '#CBD5E1',
            muted: '#64748B',
            text: '#0F172A',
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
            glow: 'rgba(245, 158, 11, 0.25)',
          },
          coral: {
            DEFAULT: '#FB923C',
            400: '#FB923C',
            500: '#F97316',
            glow: 'rgba(251, 146, 60, 0.25)',
          },
          cyan: {
            DEFAULT: '#06B6D4',
            300: '#67E8F9',
            400: '#22D3EE',
            500: '#06B6D4',
            600: '#0891B2',
            700: '#0E7490',
            glow: 'rgba(6, 182, 212, 0.25)',
          },
          emerald: {
            DEFAULT: '#10B981',
            400: '#34D399',
            500: '#10B981',
          },
          crimson: {
            DEFAULT: '#EF4444',
            400: '#F87171',
            500: '#EF4444',
            glow: 'rgba(239, 68, 68, 0.25)',
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Consolas', 'monospace'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'warm-glow': '0 0 25px -5px rgba(245, 158, 11, 0.2)',
        'cyan-glow': '0 0 25px -5px rgba(6, 182, 212, 0.2)',
        'crimson-glow': '0 0 25px -5px rgba(239, 68, 68, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
