
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Poppins', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'zoom-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'blob-1': { 
            '0%': { transform: 'translate(0px, 0px) scale(1)', opacity: '0.7' },
            '33%': { transform: 'translate(120px, -150px) scale(1.2)', opacity: '0.8' },
            '66%': { transform: 'translate(-90px, 120px) scale(0.8)', opacity: '0.75' },
            '100%': { transform: 'translate(0px, 0px) scale(1)', opacity: '0.7' },
        },
        'blob-2': {
            '0%': { transform: 'translate(0px, 0px) scale(1)', opacity: '0.65' },
            '33%': { transform: 'translate(-105px, 135px) scale(1.15)', opacity: '0.75' },
            '66%': { transform: 'translate(75px, -75px) scale(0.9)', opacity: '0.7' },
            '100%': { transform: 'translate(0px, 0px) scale(1)', opacity: '0.65' },
        },
        'blob-3': {
            '0%': { transform: 'translate(0px, 0px) scale(1.1)', opacity: '0.8' },
            '25%': { transform: 'translate(90px, 105px) scale(1)', opacity: '0.7' },
            '50%': { transform: 'translate(-120px, -90px) scale(1.25)', opacity: '0.85' },
            '75%': { transform: 'translate(60px, -60px) scale(0.85)', opacity: '0.65' },
            '100%': { transform: 'translate(0px, 0px) scale(1.1)', opacity: '0.8' },
        },
        'blob-4': {
            '0%': { transform: 'translate(0px, 0px) scale(0.9)', opacity: '0.6' },
            '33%': { transform: 'translate(105px, 120px) scale(1.1)', opacity: '0.7' },
            '66%': { transform: 'translate(-135px, -105px) scale(1.15)', opacity: '0.65' },
            '100%': { transform: 'translate(0px, 0px) scale(0.9)', opacity: '0.6' },
        },
        'raindrop-fall-1': {
          '0%': { transform: 'translateY(-100%) translateX(0px) scale(0.8)', opacity: '0' },
          '10%': { opacity: '0.7' },
          '90%': { transform: 'translateY(100vh) translateX(20px) scale(1)', opacity: '0.3' },
          '100%': { transform: 'translateY(100vh) translateX(20px) scale(1)', opacity: '0' },
        },
        'raindrop-fall-2': {
          '0%': { transform: 'translateY(-100%) translateX(0px) scale(0.9)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { transform: 'translateY(100vh) translateX(-15px) scale(1.1)', opacity: '0.2' },
          '100%': { transform: 'translateY(100vh) translateX(-15px) scale(1.1)', opacity: '0' },
        },
        'raindrop-fall-3': {
          '0%': { transform: 'translateY(-100%) translateX(0px) scale(1)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { transform: 'translateY(100vh) translateX(10px) scale(0.9)', opacity: '0.4' },
          '100%': { transform: 'translateY(100vh) translateX(10px) scale(0.9)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'zoom-in': 'zoom-in 0.5s ease-out forwards',
        'blob-1': 'blob-1 20s infinite ease-in-out',
        'blob-2': 'blob-2 25s infinite ease-in-out alternate',
        'blob-3': 'blob-3 18s infinite ease-in-out',
        'blob-4': 'blob-4 22s infinite ease-in-out alternate-reverse',
        'raindrop-fall-1': 'raindrop-fall-1 8s linear infinite',
        'raindrop-fall-2': 'raindrop-fall-2 10s linear infinite',
        'raindrop-fall-3': 'raindrop-fall-3 7s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
