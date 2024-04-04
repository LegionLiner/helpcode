/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      eslintrc: {
        enabled: true,
        filepath: "./eslintrc-auto-import.json",
        globalsPropValue: true,
      },
      dts: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../src', import.meta.url)),
      '@core': fileURLToPath(new URL('../frontend-core', import.meta.url)),
      '@assets': fileURLToPath(new URL('../src/assets', import.meta.url)),
    }
  },
  test: {
    name: "happy-dom",
    environment: "happy-dom",
    setupFiles: ["./src//test/vitest.setup.ts"],
    globals: true,
  },
});
