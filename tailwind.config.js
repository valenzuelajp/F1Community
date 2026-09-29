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
        /* Pit-wall broadcast palette (home + content pages). */
        pit: {
          carbon: '#07080b',
          band: '#0b0d12',
          surface: '#10131a',
          red: '#ff1801',
          yellow: '#ffd12e',
          green: '#3ddc84',
          ink: '#f2f3f5',
          muted: '#a6adbb',
          line: '#1f242e',
        },
      },
      fontFamily: {
        /* Scoped display/body faces for the pit-wall theme (home + pages). */
        'pit-display': ['var(--font-pit-display)', 'Arial Narrow', 'sans-serif'],
        'pit-body': ['var(--font-pit-body)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
