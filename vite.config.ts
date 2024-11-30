import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@context': '/src/context',
      '@theme': '/src/theme',
      '@types': '/src/types',
      '@shared': '/src/shared',
      '@resolvers': '/src/resolvers'
    },
  },
})
