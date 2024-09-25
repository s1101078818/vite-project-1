import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

export default defineConfig({
  // ...
  plugins: [
    [vue()], viteCommonjs(),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ]
  // ,
  // server: {
  //   host: '0.0.0.0',
  //   port: 5173,
  //   proxy: {
  //     '/api': {
  //       target: 'http://192.168.31.142:7188/api',
  //       changeOrigin: true,
  //     }
  //   }
  // }
})