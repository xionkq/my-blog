import type { Config } from 'tailwindcss'
import { getAllLabelClass } from './app/lib/label'

const config: Config = {
  darkMode: 'selector',
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        18: '72px',
      },
      backgroundImage: {
        'img-light': 'linear-gradient(to bottom, transparent, rgb(255, 255, 255)) rgb(214, 219, 220)',
        'img-black': 'linear-gradient(to bottom, #090D1F, #090D1F)',
      },
      maxWidth: {
        large: '1280px',
      },
      fontSize: {
        banner: '40px',
      },
      colors: {
        'card-purple': '#6941C6',
        'card-gray': '#667085',
        'card-gray-dark': '#C0C5D0',
        black: '#1A1A1A',
      },
      backgroundColor: {
        black: '#090D1F',
      },
      borderColor: {
        gray: '#EAECF0',
        'gray-dark': '#EAECF034',
      },
    },
  },
  safelist: [...getAllLabelClass()],
  plugins: [],
}
export default config
