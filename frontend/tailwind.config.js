/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      colors: {
        oneui: {
          bg: '#F2F4F8',
          card: '#FFFFFF',
          emerald: '#10B981',
          blue: '#2563EB',
          amber: '#F59E0B',
          rose: '#E11D48',
          subtext: '#64748B'
        }
      }
    },
  },
  plugins: [],
}
