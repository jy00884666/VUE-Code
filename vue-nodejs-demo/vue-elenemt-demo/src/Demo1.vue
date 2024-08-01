<template>
    <!-- 整体卡片 -->
    <el-card style="max-width: 100%">
        <!-- 头部 -->
        <div class="card-header">
            <span>文章管理</span>
            <!-- 弹框显示表单添加文章, trigger:触发方式 , visible:属性控制Popover是否显示 , @hide=隐藏时触发事件 
                   一.弹出框中嵌套表单提交 trigger="click" 会出现问题,在弹出框的表单元素中选择下拉框或者日期控件时,弹出框会一并关闭,原因是el-popover内部的元素在触发下拉框时，
                      会触发el-popover的隐藏事件。为了解决这个问题，可以使用trigger属性设置为“manual”，然后手动控制弹框的显示和隐藏。
             -->
            <el-popover placement="top-start" :width="600" trigger="manual" :visible="addArticleView"
                @hide="resetPopover">
                <template #reference>
                    <el-button type="primary" @click="addArticleView = true;">发布文章</el-button>
                </template>
                <!-- 新增文章表单,rules表单校验 配合prop一起使用 -->
                <el-form :model="articleObj" label-width="auto" style="width: 100%;" :rules="rules" ref="articleObjRef">
                    <!-- 文本 -->
                    <el-form-item label="标题" prop="title">
                        <!-- placeholder: 用于输入框内灰色的占位字符的设置，例：placeholder="请输入用户名",需要配合 clearable 属性一起使用
                            clearable: 是否可清空,默认false
                        -->
                        <el-input v-model="articleObj.title" placeholder="请输入" clearable />
                    </el-form-item>
                    <!-- 下拉框 -->
                    <el-form-item label="分类" prop="category">
                        <el-select v-model="articleObj.category" placeholder="请选择" clearable>
                            <el-option label="1-时事" value="时事" />
                            <el-option label="2-旅游" value="旅游" />
                            <el-option label="3-篮球" value="篮球" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态" prop="state">
                        <el-select v-model="articleObj.state" placeholder="请选择" clearable>
                            <el-option label="1-已发布" value="已发布" />
                            <el-option label="2-草稿" value="草稿" />
                        </el-select>
                    </el-form-item>
                    <!-- 日期框 -->
                    <el-form-item label="发布日期" prop="time">
                        <el-date-picker v-model="articleObj.time" type="date" placeholder="请选择" clearable
                            value-format="YYYY-MM-DD" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addArticle">确定</el-button>
                        <el-button type="primary" @click="channel">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-popover>
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
                <el-date-picker v-model="searchConditions.time" type="date" placeholder="请选择" clearable
                    value-format="YYYY-MM-DD" />
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

// alert弹框样式
import { ElMessage } from 'element-plus'

// 分页条样式
import type { ComponentSize } from 'element-plus';
import { ValidateComponentsMap } from 'element-plus/es/utils';
import { errorMessages } from 'vue/compiler-sfc';
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

/**添加文章弹框响应式对象 */
const articleObj = ref({
    title: "",
    category: "",
    state: "",
    time: ""
});

/**表单验证响应式对象 在form表单中通过ref属性标识一下 */
const articleObjRef = ref(null);

/** 添加文章按钮事件 */
const addArticle = () => {
    /**对整个表单内容进行一次统一验证
     * 此方法接收一个回调函数
     * 第一个参数:是布尔类型，当所有的校验规则都通过时，此值是true，否则false
     * 第二个参数:是校验未通过的所有字段的数组 
     * */
    articleObjRef.value.validate((isValid, invalidFields) => {
        // 校验通过
        if (isValid) {
            // 发送异步请求,请求的入参放第二个参数中,响应式数据一定要用.value
            axios.post("http://localhost:8080/articleController/add", articleObj.value).then(result => {
                // 成功的回调
                // 隐藏弹框。
                addArticleView.value = false;
                // 调用搜索方法
                onSubmit();
                ElMessage.success('文章发布成功');
            }).catch(err => {
                // 失败的回调
                console.log(err);
                // 隐藏弹框。
                addArticleView.value = false;
            });
        } else {
            // 校验不通过
            console.log(invalidFields);
            ElMessage.error("验证失败请检查");
        }
    });
}

// 获取弹框组件响应式对象
const addArticleView = ref(null);
/** 关闭弹框 */
const channel = () => {
    // 隐藏弹框。
    addArticleView.value = false;
}

/**弹框hide事件 重置 addArticleView 为null,下次点击操作框才能正常弹出 */
const resetPopover = () => {
    addArticleView.value = null;
}

/**自定义校验方法 必须定义在rules上面
 * 入参1,校验规则描述信息
 * 入参2,当前表单填写的值
 * 入参3,回调函数,通过此函数控制是否校验通过
 */
const passwordRef = (rules, value, callback) => {
    if (value === "111") {
        callback(new Error("标题不能是111"));
    } else if (value === "222" && articleObj.value.category === "时事") {
        callback(new Error("时事分类标题不能是222"));
    } else {
        callback();
    }
}

/**新增文章表单校验规则 */
const rules = {
    title: [
        /* 非空校验,光标离开时校验 */
        { required: true, message: '标题不能为空', trigger: 'blur' },
        { min: 3, meessage: "长度需要大于3", trigger: "blur" },
        /* 自定义校验方法 */
        { validator: passwordRef, trigger: "blur" }
    ],
    category: [
        { required: true, message: '分类不能为空', trigger: 'blur' },
        /* 自定义校验方法 */
        { validator: passwordRef, trigger: "blur" }
    ],
    state: [
        { required: true, message: '状态不能为空', trigger: 'blur' }
    ],
    time: [
        { required: true, message: '日期不能为空', trigger: 'blur' }
    ]
}

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
