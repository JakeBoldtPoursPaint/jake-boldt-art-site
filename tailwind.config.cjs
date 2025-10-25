/** @type {import('tailwindcss').Config} */
module.exports = { content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"], theme: { extend: {extend: {
  fontFamily: {
    sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    display: ['Bebas Neue', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  },
},
} }, plugins: [] };