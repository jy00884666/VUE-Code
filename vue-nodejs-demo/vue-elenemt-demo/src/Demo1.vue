<template>
    <!-- 整体卡片 -->
    <el-card style="max-width: 100%">
        <!-- 头部 -->
        <div class="card-header">
            <span>文章管理</span>
            <el-button type="primary" @click="">发布文章</el-button>
        </div>

        <div style="margin-top: 20px;">
            <hr>
        </div>

        <!-- 表单搜索 -->
        <el-form :inline="true" :model="searchConditions" class="demo-form-inline">
            <!-- 文本 -->
            <el-form-item label="标题">
                <!-- placeholder: 用于输入框内灰色的占位字符的设置，例：placeholder="请输入用户名",需要配合 clearable 属性一起使用
                 clearable: 是否可清空,默认false
            -->
                <el-input v-model="searchConditions.title" placeholder="请输入" clearable />
            </el-form-item>
            <!-- <el-form-item label="状态">
                <el-input v-model="searchConditions.state" placeholder="请输入" clearable />
            </el-form-item> -->
            <!-- 下拉框 -->
            <el-form-item label="分类">
                <el-select v-model="searchConditions.category" placeholder="请选择" clearable>
                    <el-option label="1-时事" value="时事" />
                    <el-option label="2-旅游" value="旅游" />
                    <el-option label="3-篮球" value="篮球" />
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="searchConditions.state" placeholder="请选择" clearable>
                    <el-option label="1-已发布" value="已发布" />
                    <el-option label="2-草稿" value="草稿" />
                </el-select>
            </el-form-item>
            <!-- 日期框 -->
            <el-form-item label="发布日期">
                <el-date-picker v-model="searchConditions.time" type="date" placeholder="请选择" clearable value-format="YYYY-MM-DD"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click="clear">重制</el-button>
            </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table :data="articleList" style="width: 100%">
            <el-table-column prop="title" label="文章标题" />
            <el-table-column prop="category" label="分类" />
            <el-table-column prop="time" label="发表时间" />
            <el-table-column prop="state" label="状态" />
            <el-table-column label="操作" width="180">
                <el-button type="primary" :icon="Edit" circle />
                <el-button type="danger" :icon="Delete" circle />
            </el-table-column>
        </el-table>

        <!-- 分页条 
            layout: 控制分页元素显示顺序 jumper:前往第几页
                                        total:总记录数
                                        sizes:每页多少条下拉框
                                        prev: <箭头
                                        pager: 页码超链接
                                        next: >箭头
            v-model:current-page: 当前页
            v-model:page-size: 每页显示条数
            disabled: 分页条是否禁用
            background: 背景是否显示
            size: 分页样式大小,三种选择'large'| 'default'| 'small'
            @size-change: 修改下拉框每页显示条数回调方法
            @current-change: 前往第几页,或点击页码超链接回调方法
        -->
        <el-pagination class="el-p" v-model:current-page="currentPage4" v-model:page-size="pageSize4"
            :page-sizes="[10, 20, 30, 40]" :size="size" :disabled="disabled" :background="background"
            layout="jumper ,total, sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </el-card>
</template>

<script lang="ts" setup>
// 按钮样式
import {
    Delete,
    Edit
} from '@element-plus/icons-vue'

// 导入 axios
import axios from "axios";
// 导入 ref 
import { ref } from "vue";



// 分页条样式
import type { ComponentSize } from 'element-plus';
// 起始页
const currentPage4 = ref(1);
// 每页记录数
const pageSize4 = ref(10);
// 分页大小样式,三种选择'large'| 'default'| 'small'
const size = ref<ComponentSize>('default');
// 背景是否显示
const background = ref(false);
// 是否禁用
const disabled = ref(false);
// 总记录数
const total = ref(0);


/** 修改下拉框每页显示条数回调方法,入参每页显示条数 */
const handleSizeChange = (val: number) => {
    console.log(val + 'items per page');
};
/** 前往第几页,或点击页码超链接回调方法,入参当前页 */
const handleCurrentChange = (val: number) => {
    console.log('current page: ' + val);
};

// 定义响应式数据 展示的 table 集合
const articleList = ref([]);

// 异步获取列表数据请求,别名方式发送请求,推荐
axios.post("http://localhost:8080/articleController/getAll").then(result => {
    // 成功的回调
    // result 表示服务器响应的所有的数据,包含了响应头,响应体,result.data 代表的是接口响应的核心数据
    console.log(result.data);
    // 保存响应式数据一定要用.value,不能直接赋值 articleList = result.data;
    articleList.value = result.data;
    // 更新总记录数
    total.value = articleList.value.length;
}).catch(err => {
    // 失败的回调
    console.log(err);
});

/** 表单搜索 */
// 定义响应式数据 条件对象
const searchConditions = ref({
    title: "",
    category: "",
    state: "",
    time: ""
});
/** 搜索事件 */
const onSubmit = () => {
    // 发送异步请求,请求的入参放第二个参数中,响应式数据一定要用.value
    axios.post("http://localhost:8080/articleController/search", searchConditions.value).then(result => {
        // 成功的回调
        // result 表示服务器响应的所有的数据,包含了响应头,响应体,result.data 代表的是接口响应的核心数据
        console.log(result.data);
        // 保存响应式数据一定要用.value,不能直接赋值 articleList = result.data;
        articleList.value = result.data;
        // 更新总记录数
        total.value = articleList.value.length;
    }).catch(err => {
        // 失败的回调
        console.log(err);
    });
};
/** 重制事件 */
const clear = () => {
    // 保存响应式数据一定要用.value,不能直接赋值
    searchConditions.value.title = "";
    searchConditions.value.category = "";
    searchConditions.value.state = "";
    searchConditions.value.time = "";
};
</script>


<!-- scoped 表示这里的样式只在当前vue文件中生效 -->
<style scoped>
/* 分页样式 */
.el-p {
    margin-top: 20px;
    /* 弹性布局（Flex布局）是一种现代的CSS布局方式，通过使用display: flex属性来创建一个弹性容器，并在其中使用灵活的盒子模型来进行元素的排列和定位。 */
    display: flex;
    /* 弹性盒子容器的对齐方式 flex-end 用于对齐容器末端。默认是 flex-start 对齐容器开始*/
    justify-content: flex-end;
}

/**表单文本样式 */
.demo-form-inline .el-input {
    --el-input-width: 220px;
}

/**表单下拉框样式 */
.demo-form-inline .el-select {
    --el-select-width: 220px;
}

/** 卡片样式 */
.card-header {
    /* 弹性布局（Flex布局）是一种现代的CSS布局方式，通过使用display: flex属性来创建一个弹性容器，并在其中使用灵活的盒子模型来进行元素的排列和定位。 */
    display: flex;
    /* 弹性盒子容器的对齐方式: space-between 两端对齐 中间等距*/
    justify-content: space-between;
}
</style>
