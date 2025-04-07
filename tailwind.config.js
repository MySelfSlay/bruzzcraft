/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand': {
          red: '#FF0000',
          dark: '#000000',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'impulse': 'impulse 1s ease-in-out infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        'html': { 
          scrollBehavior: 'smooth',
          colorScheme: 'dark'
        },
        'body': { 
          backgroundColor: theme('colors.brand.dark'),
          color: theme('colors.white'),
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        }
      });
    }
  ],
};