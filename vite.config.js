import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // important 🔥
    allowedHosts: ['.ngrok-free.dev'] // 👈 aa add karo
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    globals: true
  }
})
