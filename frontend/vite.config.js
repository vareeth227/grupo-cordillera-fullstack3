import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vite para el dashboard Grupo Cordillera
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Proxy para evitar CORS en desarrollo: redirige /api/* al API Gateway
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})
