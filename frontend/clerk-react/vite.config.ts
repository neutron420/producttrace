import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // ✅ Added for proper relative asset loading in deployment
  plugins: [react(), tailwindcss()],
})
