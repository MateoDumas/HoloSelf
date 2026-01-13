import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // Base path:
  // - GitHub Pages: '/HoloSelf/' (cuando GITHUB_PAGES=true)
  // - Vercel/Netlify/otros: '/' (default)
  base: process.env.GITHUB_PAGES === 'true' ? '/HoloSelf/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
    exclude: ['@google/model-viewer'],
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'drei': ['@react-three/drei'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
