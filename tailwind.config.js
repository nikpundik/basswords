/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        mono: ["Kode"],
      },
    },
  },
  plugins: [],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
};
