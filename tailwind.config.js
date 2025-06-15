/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5faff',
          100: '#e3eaf6',
          200: '#c2d4ec',
          300: '#8fb2e0',
          400: '#4d8ed6',
          500: '#2563eb', // deep blue
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#172554',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b', // slate
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#fffbe6',
          100: '#fff3bf',
          200: '#ffe066',
          300: '#ffd43b',
          400: '#fcc419',
          500: '#fab005', // gold
          600: '#f59f00',
          700: '#f08c00',
          800: '#e67700',
          900: '#d9480f',
        },
        neutral: {
          50: '#fafbfc',
          100: '#f4f6f8',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        wedding: {
          light: '#f9f5f6',
          rose: '#f8e1e7',
          gold: '#d4af37',
          burgundy: '#800020',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}