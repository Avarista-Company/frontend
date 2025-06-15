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
          500: '#1e3a8a', // royal blue
          600: '#174ea6',
          700: '#153e75',
          800: '#102a43',
          900: '#0a1a2f',
        },
        accent: {
          50: '#fffbe6',
          100: '#fff3bf',
          200: '#ffe066',
          300: '#ffd43b',
          400: '#fcc419',
          500: '#fab005', // golden yellow
          600: '#f59f00',
          700: '#f08c00',
          800: '#e67700',
          900: '#d9480f',
        },
        teal: {
          50: '#e6fcf5',
          100: '#c3fae8',
          200: '#96f2d7',
          300: '#63e6be',
          400: '#38d9a9',
          500: '#20c997',
          600: '#12b886',
          700: '#0ca678',
          800: '#099268',
          900: '#087f5b',
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
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Merriweather', 'ui-serif', 'Georgia'],
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(16, 42, 67, 0.08)',
      },
      keyframes: {
        'carousel-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'carousel-scroll': 'carousel-scroll 30s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}