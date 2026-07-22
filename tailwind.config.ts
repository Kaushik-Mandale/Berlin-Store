import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Berlin Store Brand Palette
        brand: {
          black: '#0a0a0a',
          charcoal: '#1a1a1a',
          dark: '#111111',
          gray: {
            50: '#f9f9f9',
            100: '#f0f0f0',
            200: '#e0e0e0',
            300: '#c8c8c8',
            400: '#9a9a9a',
            500: '#6b6b6b',
            600: '#4a4a4a',
            700: '#333333',
            800: '#222222',
            900: '#111111',
          },
          gold: '#c9a84c',
          'gold-light': '#e8c96b',
          'gold-dark': '#9a7a2e',
          cream: '#faf8f5',
          'off-white': '#f5f3f0',
        },
        // Semantic colors
        primary: {
          DEFAULT: '#0a0a0a',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#c9a84c',
          foreground: '#0a0a0a',
        },
        accent: {
          DEFAULT: '#f0ede8',
          foreground: '#0a0a0a',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#111111',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        '10xl': ['10rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glow-gold': '0 0 30px rgba(201, 168, 76, 0.3)',
        'glow-white': '0 0 30px rgba(255, 255, 255, 0.1)',
        'card': '0 2px 20px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.12)',
        'premium': '0 20px 60px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'brand-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        'gold-gradient': 'linear-gradient(135deg, #c9a84c 0%, #e8c96b 50%, #9a7a2e 100%)',
        'cream-gradient': 'linear-gradient(180deg, #faf8f5 0%, #f0ede8 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'shimmer': 'shimmer 2s infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 168, 76, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(201, 168, 76, 0.5)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      screens: {
        'xs': '480px',
        '3xl': '1920px',
      },
      transitionTimingFunction: {
        'ease-spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
};

export default config;
