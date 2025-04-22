import { heroui } from '@heroui/theme';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
    './widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: {
            DEFAULT: '#0D1117',
            secondary: '#161B22',
            tertiary: '#1F2937',
          },
          surface: {
            DEFAULT: '#121620',
            hover: '#1C2333',
            active: '#252E3F',
          },
          border: {
            DEFAULT: '#30363D',
            light: '#383F47',
            focus: '#58A6FF',
          },
          text: {
            primary: '#E6EDF3',
            secondary: '#8B949E',
            tertiary: '#6E7681',
            disabled: '#484F58',
          },
          accent: {
            primary: {
              DEFAULT: '#00E599',
              hover: '#00F5A0',
              muted: 'rgba(0, 229, 153, 0.2)',
            },
            blue: {
              DEFAULT: '#58A6FF',
              muted: 'rgba(88, 166, 255, 0.2)',
            },
            purple: {
              DEFAULT: '#BD93F9',
              muted: 'rgba(189, 147, 249, 0.2)',
            },
            pink: {
              DEFAULT: '#FF79C6',
              muted: 'rgba(255, 121, 198, 0.2)',
            },
            orange: {
              DEFAULT: '#FFCA80',
              muted: 'rgba(255, 202, 128, 0.2)',
            },
          },
          status: {
            danger: {
              DEFAULT: '#FF4D4D',
              muted: 'rgba(255, 77, 77, 0.2)',
            },
            warning: {
              DEFAULT: '#FFB800',
              muted: 'rgba(255, 184, 0, 0.2)',
            },
            success: {
              DEFAULT: '#00E599',
              muted: 'rgba(0, 229, 153, 0.2)',
            },
            info: {
              DEFAULT: '#58A6FF',
              muted: 'rgba(88, 166, 255, 0.2)',
            },
          },
        },
        bg: '#0A0A0A',
        surface: '#121212',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        default: {
          200: '#333333',
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: '#00F5A0',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        danger: '#FF4D4D',
        warning: '#FFB800',
        success: '#00E599',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        h1: ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        h2: ['40px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        h3: ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        h3bold: ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        body: ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        small: ['14px', { lineHeight: '1.5' }],
      },
      fontWeight: {
        bold: '700',
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'spin-slow-reverse': 'spin 25s linear infinite reverse',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shine': 'shine 1.5s ease-in-out infinite',
      },
      keyframes: {
        shine: {
          '100%': { left: '125%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 229, 153, 0.5), 0 0 20px rgba(0, 229, 153, 0.3)',
        'neon-hover': '0 0 15px rgba(0, 229, 153, 0.6), 0 0 30px rgba(0, 229, 153, 0.4)',
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'dark-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'dark-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'dark-outline': '0 0 0 3px rgba(0, 229, 153, 0.5)',
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;
