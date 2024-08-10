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
import UserInfoVue from '@/user/UserInfo.vue';
import ArticleCategory from '@/article/ArticleCategory.vue';

// 定义路由关系
const routes = [
    /* 首页访问Demo1.vue */
    { path: '/', component: Demo1 },
    {
        /* 指定/Demo2路径时跳转Demo2.vue */
        path: '/Demo2', component: Demo2,
        /* 配置子路由,在Demo2中再度访问某个路径时跳转如下配置*/
        children: [
            /* 用户个人信息 */
            { path: '/user/userInfo', component: UserInfoVue },
            /* 文章分类管理 */
            { path: '/article/articleCategory', component: ArticleCategory }
        ]
    }
];

// 创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

// 导出
export default router;