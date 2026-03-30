/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f1f5f9',
        card: '#ffffff',
        border: '#e2e8f0',
        accent: '#3b82f6',
      },
    },
  },
  plugins: [],
}
