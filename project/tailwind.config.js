/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF0F8',
          100: '#FFE1F1',
          200: '#FFC2E3',
          300: '#FFA3D5',
          400: '#FF84C7',
          500: '#FF69B4', // Hot Pink
          600: '#E55A9F',
          700: '#CC4B8A',
          800: '#B23C75',
          900: '#992D60'
        },
        secondary: {
          50: '#FFF8FC',
          100: '#FFF1F9',
          200: '#FFE3F3',
          300: '#FFD5ED',
          400: '#FFC7E7',
          500: '#FFC0CB', // Pink
          600: '#E5ADB7',
          700: '#CC9AA3',
          800: '#B2878F',
          900: '#99747B'
        },
        accent: {
          50: '#FFF7FA',
          100: '#FFEFF5',
          200: '#FFDFEB',
          300: '#FFCFE1',
          400: '#FFBFD7',
          500: '#FFB6C1', // Light Pink
          600: '#E5A3AD',
          700: '#CC9099',
          800: '#B27D85',
          900: '#996A71'
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717'
        }
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-soft': 'pulseSoft 2s infinite',
        'shimmer': 'shimmer 2s linear infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem'
      },
      screens: {
        'xs': '475px'
      }
    },
  },
  plugins: [],
};