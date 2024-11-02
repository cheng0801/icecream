import './assets/css/my_style.css'
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
app.use(ElementPlus, { size: 'small', zIndex: 3000 })


import * as ElementPlusIconsVue from '@element-plus/icons-vue'


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')