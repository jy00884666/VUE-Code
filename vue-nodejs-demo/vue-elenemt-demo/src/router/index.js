/**
 * 路由基本使用
 * 1.安装vue-router npm install vue-router@4
 * 2.在src/router/index.js中创建路由器，并导出
 * 3.在vue应用实例中使用vue-router
 * 4.声明router-view标签，展示组件内容
 * 
 * Vue-Router路由例子 
 * 配置当用户请求的是.../demo2时显示Demo2.vue页面,当用户请求的是.../时显示Demo1.vue
 */

// 导入vue-router
import { createRouter, createWebHistory } from 'vue-router';

// 导入组件
import Demo1 from '@/Demo1.vue';
import Demo2 from '@/Demo2.vue';

// 定义路由关系
const routes = [
    { path: '/', component: Demo1 },
    { path: '/Demo2', component: Demo2 }
];

// 创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

// 导出
export default router;