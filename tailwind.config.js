module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
        },
        gray: {
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}