import { createPinia } from 'pinia' //引入pinia
const pinia = createPinia() //创建pinia实列
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'//pinia持久化


pinia.use(piniaPluginPersistedstate)

export default pinia // 导出pinia用于main.js注册