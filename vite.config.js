import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/login": 'http://localhost:8080/',
      "/channels": 'http//localhost:8080/',
      "/myPage":'http//localhost:8080/',
      "/users": 'http//localhost:8080/',
      "/messages": 'http//localhost:8080/'
    }
  }
})
