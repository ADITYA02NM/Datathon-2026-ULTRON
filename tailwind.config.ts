import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0e1a',
        foreground: '#f1f5f9',
        border: '#2a2a3a',
        surface: '#111827',
        elevated: '#1a1a24',
        gold: '#f0b000',
        teal: '#20a080',
        purple: '#800060',
        red: '#c02040',
      },
      backgroundColor: {
        dark: '#0a0e1a',
        surface: '#111827',
        elevated: '#1a1a24',
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
      },
      backdropBlur: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
    },
  },
  plugins: [],
};

export default config;
