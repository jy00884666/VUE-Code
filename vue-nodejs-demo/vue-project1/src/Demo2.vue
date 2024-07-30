<!-- 组合式API开发,请求到后台Springboot_VUE_demo应用
    1.钩子函数mounted中，获取所有的文章数据
    2.使用v-for指令,把数据渲染到表格上展示
    3.使用v-model指令完成表单数据的双向绑定
    4.使用v-on指令为搜索按钮绑定单击事件
-->


<!-- 调用ref函数,定义响应式数据
     <script setup>  setup:是一个标识，告诉Vue需要进行一些处理，让我们可以更简洁的使用组合式API。
     import { ref }  ref():接收一个内部值，返回一个响应式的ref对象，此对象只有一个指向内部值的属性value。

-->
<script setup>
/** cmd项目路径下中使用命令 npm install axios 安装导入本地安装好的axios, 不在使用 http://... 的方式导入 axios
 *  安装成功后node_modules下会出现axios文件夹
 */
// 导入 axios
import axios from "axios";
// 导入 ref 
import { ref } from "vue";
// 定义响应式数据 展示的 table 集合
const articleList = ref([]);
// 定义响应式数据 条件对象
const searchConditions = ref({
    category: "",
    state: ""
});

// 异步获取列表数据请求,别名方式发送请求,推荐
axios.post("http://localhost:8080/articleController/getAll").then(result => {
    // 成功的回调
    // result 表示服务器响应的所有的数据,包含了响应头,响应体,result.data 代表的是接口响应的核心数据
    console.log(result.data);
    // 保存响应式数据一定要用.value,不能直接赋值 articleList = result.data;
    articleList.value = result.data;

}).catch(err => {
    // 失败的回调
    console.log(err);
});

/*申明 搜索按钮*/
const search = function () {
    // 发送异步请求,请求的入参放第二个参数中,响应式数据一定要用.value
    axios.post("http://localhost:8080/articleController/search", searchConditions.value).then(result => {
        // 成功的回调
        // result 表示服务器响应的所有的数据,包含了响应头,响应体,result.data 代表的是接口响应的核心数据
        console.log(result.data);
        articleList.value = result.data;
    }).catch(err => {
        // 失败的回调
        console.log(err);
    });

    // 传参写法二:params:{{...searchConditions.value}}
    /*axios.post("http://localhost:8080/articleController/search", { params: { ...searchConditions.value } }).then(result => {
        // 成功的回调
        // result 表示服务器响应的所有的数据,包含了响应头,响应体,result.data 代表的是接口响应的核心数据
        console.log(result.data);
        articleList.value = result.data;
    }).catch(err => {
        // 失败的回调
        console.log(err);
    });*/
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
