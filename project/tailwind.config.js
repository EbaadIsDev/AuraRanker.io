/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a16',
        surface: '#161630',
        'surface-light': '#242450',
        primary: '#6b46c1',
        secondary: '#0bc5ea',
        accent: '#f687b3',
        // Aura colors
        mystic: '#9f7aea',
        alpha: '#e53e3e',
        chaotic: '#ed8936',
        chill: '#38b2ac',
        regal: '#d69e2e',
        menacing: '#805ad5',
        soft: '#f687b3',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(107, 70, 193, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(107, 70, 193, 0.8)' },
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'aura': '0 0 15px rgba(107, 70, 193, 0.6)',
        'mystic': '0 0 15px rgba(159, 122, 234, 0.6)',
        'alpha': '0 0 15px rgba(229, 62, 62, 0.6)',
        'chaotic': '0 0 15px rgba(237, 137, 54, 0.6)',
        'chill': '0 0 15px rgba(56, 178, 172, 0.6)',
        'regal': '0 0 15px rgba(214, 158, 46, 0.6)',
        'menacing': '0 0 15px rgba(128, 90, 213, 0.6)',
        'soft': '0 0 15px rgba(246, 135, 179, 0.6)',
      },
    },
  },
  plugins: [],
};