
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",       // se usa app router
    "./pages/**/*.{ts,tsx}",     // se usa pages router
    "./components/**/*.{ts,tsx}" // aqui normalmente fica seu sidebar e componentes UI
  ],
  theme: {
    extend: {
      screen: {
        "max-md": { "max": "767.98px" }
      }
    },
  },
  darkMode: "class",
  plugins: [],
};