import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ganti 'tinder-cats' dengan nama repo GitHub
export default defineConfig({
  plugins: [react()],
  base: '/tinder-cats/'
})
