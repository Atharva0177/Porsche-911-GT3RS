module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        primary: '#FFFFFF',
        accent: '#CC0000',
        'accent-light': '#FF3333',
        muted: '#FFFFFF',
        'muted-light': '#FFFFFF'
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace']
      },
      fontSize: {
        'display-xl': '120px',
        'display-lg': '96px',
        'display-md': '72px',
        'headline-xl': '48px',
        'headline-lg': '36px',
        'headline-md': '28px'
      }
    }
  },
  plugins: []
}
