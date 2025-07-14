import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/Appointment-Calendar",
  plugins: [
    tailwindcss(),
    react(),
  ],
})
