import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Import other plugins if needed
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
