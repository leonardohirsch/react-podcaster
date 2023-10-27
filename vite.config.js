import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Nombre del directorio para los archivos en produccion (también será el path de la app en desarrollo)
  plugins: [react(), eslint()],
})
