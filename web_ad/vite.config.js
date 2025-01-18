import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
  
    }),


    Icons({
      autoInstall: true,
    }),
  ],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {

    host: '0.0.0.0', //ip地址

    port: 8080, //端口号

    open: false, //启动后是否自动打开浏览器

    // proxy: {
    //   '/api': {
    //     target: 'http://192.168.6.195:8080', // 目标服务器
    //     changeOrigin: true, // 是否改变请求源
    //     // rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
    //   },
    // },


    proxy:{
      // 以api为前缀才开启代理,可修改
      // 可以配置多个
      '/api/user':{
        target:'http://192.168.6.195:8080',//代理目标的基础路径，服务端的端口号
        //关闭语法检查
        lintOnSave:false,
        changeOrigin:true,//允许跨域 可以代理反向的地址
        pathRewrite:{
          '^/api':'' //重写路径，将api开头的路径改为''
        }
      }
    }



  }



})
// vite.config.ts