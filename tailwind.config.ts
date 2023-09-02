import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'Purple': '#633CFF',
      'Purple-Hover-Color': '#BEADFF',
      'Light-Purple': '#EFEBFF',
      'Dark-Grey': '#333333',
      'Grey': '#737373',
      'Borders': '#D9D9D9',
      'Light-Grey': '#FAFAFA',
      'White': '#FFFFFF',
      'Red': '#FF3939',
     },
  },
  plugins: [],
}
export default config
