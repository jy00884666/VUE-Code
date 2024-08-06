<!-- 
 /**
 * 在demo2的基础上进行优化
 * 1.将发送请求数据进行封装,封装到demo3.js文件中进行调用
 *      用到了 await 同步等待结果关键字,async 异步方法关键字(这里没有演示,因为拦截器已经是异步请求了),await请求必须写在async修饰的方法中
 * 2.将请求域名前缀进行分装,使用axios.create方法
 * 3.使用axios拦截器,将每次请求都会响应的then或catch处理进行封装
 */
-->


<script setup>
// 有命名导入,不是使用export default导出的方式导入,这里需要和demo.js导出的命名对应上
import { articleControllerGetAllService, articleControllerSearchService } from "@/demo3/demo3.js";
// 导入 ref 
import { ref } from "vue";
// 定义响应式数据 展示的 table 集合
const articleList = ref([]);
// 定义响应式数据 条件对象
const searchConditions = ref({
    category: "",
    state: ""
});

// 获取列表数据请求,这里需要封装成一个方法,使用 await 同步等待结果关键字,async 异步方法关键字,进行同步调用
const getAllArticle = async function () {
    let data = await articleControllerGetAllService();
    articleList.value = data;
}
getAllArticle();

/*申明 搜索按钮*/
const search = async function () {
    let data = await articleControllerSearchService(searchConditions.value);
    articleList.value = data;
}

/*申明 重制按钮,清空数据*/
const clear = function () {
    // 保存响应式数据一定要用.value,不能直接赋值
    searchConditions.value.category = "";
    searchConditions.value.state = "";
}


</script>

<template>
    <div>
        <!-- html -->
        文章分类:<input type="text" v-model="searchConditions.category" />

        <br />
        <!--  -->
        发布状态:<input type="text" v-model="searchConditions.state">

        <br />

        <button v-on:click="search">搜索</button>
        <button v-on:click="clear">重制</button>

        <br />
        <br />

        <table border="1 solid" colspan="0" cellspacing="0">
            <tr>
                <th>文章标题</th>
                <th>分类</th>
                <th>发表时间</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            <tr v-for="(article, index) in articleList">
                <td>{{ article.title }}</td>
                <td>{{ article.category }}</td>
                <td>{{ article.time }}</td>
                <td>{{ article.state }}</td>
                <td>
                    <button>编辑</button>
                    <button>删除</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
/* 样式 */
th {
    color: red;
}
</style>
