/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0f1a',
          card: '#1e293b',
          border: '#334155',
        },
        neon: {
          cyan: '#22d3ee',
          orange: '#fb923c',
          purple: '#a855f7',
        },
        light: {
          bg: '#fff7ed',
          card: '#ffffff',
          border: '#fed7aa',
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(34, 211, 238, 0.5)',
        'neon-orange': '0 0 20px rgba(251, 146, 60, 0.5)',
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(34, 211, 238, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}
