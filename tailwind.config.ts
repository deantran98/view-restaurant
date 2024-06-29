import type { Config } from 'tailwindcss'

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
      fontWeight: {
        semibold: '600',
      },
      zIndex: {
        999: '999',
      },
      colors: {
        'zs-light-gray': '#4D5053',
      },
    },
    screens: {
      sm: '640px',
      md: '1024px',
    },
  },
  plugins: [],
  /**Reference link for setting up tailwindcss and Material UI:
   * https://mui.com/material-ui/integrations/interoperability/#tailwind-css
   */
  corePlugins: {
    preflight: false,
  },
}
export default config
