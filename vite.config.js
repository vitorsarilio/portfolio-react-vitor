import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Esta importação

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Esta utilização do plugin
  ],
})