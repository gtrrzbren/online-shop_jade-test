import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    // Deshabilitar Vue DevTools en desarrollo
    // Cambia a true si quieres habilitarlo de nuevo
    __VUE_PROD_DEVTOOLS__: false,
  }
})