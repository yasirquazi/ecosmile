/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas:     'var(--color-canvas)',
        card:       'var(--color-card)',
        forest:     'var(--color-forest)',
        'mid-green':'var(--color-mid)',
        ink:        'var(--color-ink)',
        'ink-soft': 'var(--color-ink-soft)',
        earth:      'var(--color-earth)',
        gold:       'var(--color-gold)',
        rule:       'var(--color-rule)',
        'rule-soft':'var(--color-rule-soft)',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 7vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 4.5vw, 3.5rem)',  { lineHeight: '1.1',  letterSpacing: '-0.018em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2',  letterSpacing: '-0.012em' }],
      },
      maxWidth: {
        container: '1240px',
      },
      spacing: {
        section: 'var(--section-pad-y)',
      },
    },
  },
  plugins: [],
};
