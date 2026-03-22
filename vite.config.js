import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3777',
      '/ws': {
        target: 'ws://localhost:3777',
        ws: true,
      },
    },
  },
})
