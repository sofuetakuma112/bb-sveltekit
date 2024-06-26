// eslint-disable-next-line @typescript-eslint/no-var-requires
const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons');

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: ['dark'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        'black-black': '#000000',
        'black-black10': '#212529',
        'black-black20': '#00000033',
        'black-black30': '#0000004d',
        'black-black40': '#00000066',
        'black-black50': '#00000080',
        'black-black60': '#00000099',
        'black-black70': '#000000b2',
        'black-black80': '#000000cc',
        'black-black90': '#000000e5',
        'blue-100': '#aefaef',
        'blue-200': '#3ecaea',
        'blue-300': '#019cd5',
        'blue-400': '#4b53ff',
        'blue-gray-100': '#e6e9f0',
        'blue-gray-200': '#ced4e3',
        'blue-gray-300': '#9aa3b7',
        'blue-gray-400': '#888fa0',
        'blue-gray-50': '#f5f6fa',
        'blue-gray-500': '#737b90',
        'blue-gray-600': '#656d7f',
        'blue-gray-700': '#535968',
        'blue-gray-800': '#434752',
        'blue-gray-900': '#2f323b',
        'blue-green-100': '#b3edf3',
        'blue-green-200': '#82e2ec',
        'blue-green-300': '#4fd6e4',
        'blue-green-400': '#28ccde',
        'blue-green-50': '#e6f5f7',
        'blue-green-500': '#00c3d9',
        'blue-green-600': '#00b3c6',
        'blue-green-700': '#009eac',
        'blue-green-800': '#008a94',
        'blue-green-900': '#006669',
        'blue-white-100': '#aefaff',
        'blue-white-200': '#7cf7ff',
        'blue-white-300': '#19f1ff',
        'gray-100': '#f5f5f5',
        'gray-200': '#efefef',
        'gray-300': '#9e9ea7',
        'gray-400': '#6e6d7a',
        'gray-500': '#6C757D',
        'gray-600': '#474747',
        'gray-700': '#595959',
        'gray-800': '#3a3a3a',
        'gray-900': '#1a1a1a',
        'green-100': '#d7f9d9',
        'green-200': '#aaf2b0',
        'green-300': '#b6fdb0',
        'green-400': '#47fa37',
        'orange-100': '#ffe1b8',
        'orange-200': '#ffce8a',
        'orange-300': '#ffba5d',
        'orange-400': '#ffab3f',
        'orange-50': '#fff8ea',
        'orange-500': '#ff9d2e',
        'orange-600': '#fa922b',
        'orange-700': '#f48328',
        'orange-800': '#ed7426',
        'orange-900': '#e25c22',
        'red-100': '#ffcacf',
        'red-200': '#f49594',
        'red-300': '#eb6a6a',
        'red-400': '#f54543',
        'red-50': '#fdeaea',
        'red-500': '#f92f24',
        'red-600': '#eb2125',
        'red-700': '#d91120',
        'red-800': '#cc0018',
        'red-900': '#be0007',
        'shin-r25red-100': '#ffcbcf',
        'shin-r25red-200': '#f29795',
        'shin-r25red-300': '#e86d6c',
        'shin-r25red-400': '#f63829',
        'shin-r25red-50': '#fdeaea',
        'shin-r25red-500': '#f63829',
        'shin-r25red-600': '#e72d29',
        'shin-r25red-700': '#d52023',
        'shin-r25red-800': '#c8161c',
        'shin-r25red-900': '#ba000e',
        'white-white': '#ffffff',
        'white-white10': '#ffffff1a',
        'white-white20': '#ffffff33',
        'white-white30': '#ffffff4d',
        'white-white40': '#ffffff66',
        'white-white50': '#ffffff80',
        'white-white60': '#ffffff99',
        'white-white70': '#ffffffb2',
        'white-white80': '#ffffffcc',
        'white-white90': '#ffffffe5',
        'purple-100': '#aa57fc',
        'purple-200': '#c032f2',
        'pink-500': '#e50d4e',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      backgroundImage: {
        'image-shadow': 'linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      flex: {
        'col-4': '0 0 33.333333%',
        'col-6': '0 0 50%',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [
    require('tailwindcss-animate'),
    iconsPlugin({
      // Select the icon collections you want to use
      // You can also ignore this option to automatically discover all individual icon packages you have installed
      // If you install @iconify/json, you should explicitly specify the collections you want to use, like this:
      collections: getIconCollections(['ic', 'lucide', 'akar-icons', 'logos'])
      // If you want to use all icons from @iconify/json, you can do this:
      // collections: getIconCollections("all"),
      // and the more recommended way is to use `dynamicIconsPlugin`, see below.
    })
  ]
};

export default config;
