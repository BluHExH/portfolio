import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Local / Vercel: '/'
// GitHub Pages project site: '/portfolio/' (set via VITE_BASE in Actions)
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
})
