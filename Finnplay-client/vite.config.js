import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//Будем использовать path для работы с путями
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@components': path.resolve('./src/components'),
      '@utils': path.resolve('./src/utils'),
      '@pages': path.resolve('./src/pages'),
      '@assets': path.resolve('./src/assets'),
      '@img': path.resolve('./public'),
      '@utility': path.resolve('./src/utility'),
    }
  }
})
