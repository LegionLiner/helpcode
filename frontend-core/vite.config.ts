import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    plugins: [vue(), ...(!isDev ? [eslint()] : [])],
    preview: {
        port: 3000,
        https: true,
        host: '127.0.0.1'
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../src', import.meta.url)),
        '@core': fileURLToPath(new URL('../frontend-core', import.meta.url)),
        '@assets': fileURLToPath(new URL('../src/assets', import.meta.url)),
      }
    },
  }
})
