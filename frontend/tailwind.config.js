/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        emerald: '#10B981',
        gold: '#F59E0B',
        bgLight: '#F8FAFC',
        textDark: '#0F172A',
        textGray: '#64748B',
      },
    },
  },
  plugins: [],
}
