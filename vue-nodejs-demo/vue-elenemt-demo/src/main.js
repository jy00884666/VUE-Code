// 导入vue
import { createApp } from 'vue'
// 导入element-plus
import ElementPlus from 'element-plus'
// 导入element-plus的样式
import 'element-plus/dist/index.css'
// 导入App.vue
import App from './App.vue'
// 导入中文语言包, 分页可显示中文
//import zhcn from 'element-plus/dist/locale/zh-ch.js'

// 创建应用实例
const app = createApp(App)
// 使用element-plus
app.use(ElementPlus/* , { zhcn } */)
// 控制html元素
app.mount('#app')