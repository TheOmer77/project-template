import type { Config } from 'tailwindcss';

const config = {
  content: ['src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background))',
        foreground: 'rgb(var(--color-foreground))',
        surface: 'rgb(var(--color-surface))',
        border: 'rgb(var(--color-border))',
        btn: {
          DEFAULT: 'rgb(var(--color-btn))',
          hover: 'rgb(var(--color-btn-hover))',
        },
      },
      fontFamily: { sans: ['var(--font-sans)', 'sans-serif'] },
    },
  },
} satisfies Config;

export default config;
