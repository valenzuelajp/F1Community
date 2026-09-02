/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'f1-red': '#ff1801',
        'f1-red-hover': '#e01500',
        'f1-dark': '#0b0e14',
      },
    },
  },
  plugins: [],
};
