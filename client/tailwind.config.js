/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{html,css,tsx,ts}'],
  theme: {
    extend: {
      keyframes: {
        fadein: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        stagger: {
          '0%': { transform: 'translateY(12px)', opacity: 0 },
          '100%': { transform: 'translateY(0px)', opacity: 1 },
        },
      },
      animation: {
        fadein: 'fadeIn 1s ease-out forwards',
        stagger: 'stagger 1s ease-out forwards',
      },
    },
  },
  plugins: [],
};
