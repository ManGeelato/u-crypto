module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor:{
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        button: 'var(--color-bg-button)',
      },
      textColor:{
        accent:'var(--color-text-accent)',
        primary:'var(--color-bg-primary)',
        secondary:'var(--color-bg-secondary)',
        btnText: 'var(--color-bg-secondary)'
      },
      borderColor:{
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        input: 'var(--color-bg-input)',
        accent: 'var(--color-text-accent)',
      }
    },
  },
  plugins: [],
}
