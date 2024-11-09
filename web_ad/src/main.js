import './assets/css/my_style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './route'

const app = createApp(App)

app.use(router)

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

// 中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
app.use(ElementPlus, { size: 'small', zIndex: 3000 }, {
  locale: zhCn,
})


import * as ElementPlusIconsVue from '@element-plus/icons-vue'



for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}





app.mount('#app')