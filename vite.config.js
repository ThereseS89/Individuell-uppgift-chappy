import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/login": 'http://localhost:4767/',
      "/channels": 'http//localhost:4767/'
    }
  }
})
