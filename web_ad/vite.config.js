import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
      resolvers: [ElementPlusResolver(),IconsResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(),IconsResolver({
        enabledCollections: ["ep"],
      }),
    ],
    }),


    Icons({
      autoInstall: true,
    }),
  ],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
// vite.config.ts