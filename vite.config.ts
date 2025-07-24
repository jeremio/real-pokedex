import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '#': fileURLToPath(new URL('./types', import.meta.url)),
    },
  },
  define: {
    'process.env': {},
    'global': {},
  },
  plugins: [
    VueDevTools(),
    vue(),
    svgLoader(),
    AutoImport({
      dts: path.resolve(path.resolve(), 'src', 'auto-imports.d.ts'),
      imports: [
        'vue',
        'pinia',
      ],
      vueTemplate: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/main.scss";',
      },
    },
  },
})
