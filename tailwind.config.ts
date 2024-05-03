import type { Config } from 'tailwindcss'
import { getAllLabelClass } from './app/lib/label'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // TODO: reduce the use of custom values
      maxWidth: {
        large: '1280px',
      },
      fontSize: {
        banner: '240px',
      },
      colors: {
        'card-purple': '#6941C6',
        'card-gray': '#667085',
      },
    },
  },
  safelist: [...getAllLabelClass()],
  plugins: [],
}
export default config
