import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [react()],
    server: {
      allowedHosts: ['mern-frontend-233734.onrender.com'],
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://host.docker.internal:5000',
          changeOrigin: true
        }
      }
    }
  }
})