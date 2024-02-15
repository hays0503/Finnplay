import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//Будем использовать path для работы с путями
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@img': path.resolve(__dirname, './public'),
    }
  }
})
