/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Цветовая палитра бренда
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // Основной синий
          600: '#2563eb',  // Главный primary
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        accent: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',  // Акцентный оранжевый
          500: '#d97706',
          600: '#b45309',
        },
        success: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
      },
      // Типографика
      fontSize: {
        // Hero заголовки
        'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'hero-lg': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'hero-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],

        // Заголовки секций
        'section': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'section-lg': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'section-xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],

        // Подзаголовки
        'subsection': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'subsection-lg': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],

        // Текст
        'lead': ['1.25rem', { lineHeight: '1.6', fontWeight: '300' }],
        'lead-lg': ['1.375rem', { lineHeight: '1.6', fontWeight: '300' }],
      },
      // Отступы
      spacing: {
        'section': '4rem',      // 64px - py-16
        'section-lg': '6rem',   // 96px - py-24
        'card': '1.5rem',       // 24px - p-6
        'card-lg': '2rem',      // 32px - p-8
      },
      // Скругления
      borderRadius: {
        'card': '0.75rem',      // 12px - rounded-xl
        'card-lg': '1rem',      // 16px - rounded-2xl
        'button': '0.5rem',     // 8px - rounded-lg
      },
      // Тени
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'card-lg': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      },
      // Анимации
      transitionDuration: {
        'default': '200ms',
        'slow': '300ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(2rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
