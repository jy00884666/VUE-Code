// 导入vue
import { createApp } from 'vue'
// 导入element-plus
import ElementPlus from 'element-plus'
// 导入element-plus的样式
import 'element-plus/dist/index.css'
// 导入App.vue
import App from './App.vue'
// 导入中文语言包, 分页可显示中文
import zhcn from 'element-plus/es/locale/lang/zh-cn'
// 导入路由器Router,没有写具体xxx.js时默认导入index.js,所以这里可以不用写
import router from '@/router'

// 创建应用实例
const app = createApp(App)
// 使用element-plus
app.use(ElementPlus, { locale: zhcn })
// 使用路由器
app.use(router)
// 控制html元素
app.mount('#app')