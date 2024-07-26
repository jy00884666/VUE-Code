<!-- 方法一:写数据,export default是默认导出关键字,这里是默认导出对象把对象暴露出去 -->
<script>
export default {
    data() {
        return {
            msg: "上海"
        }
    }
}
</script>


<!-- 方法二:调用ref函数,定义响应式数据
     <script setup>  setup:是一个标识，告诉Vue需要进行一些处理，让我们可以更简洁的使用组合式API。
     import { ref }  ref():接收一个内部值，返回一个响应式的ref对象，此对象只有一个指向内部值的属性value。

-->
<script setup>
// 导入vue
import { ref } from "vue";
// 调用ref函数,定义响应式数据,响应式数据就是和页面元素绑定
const msg = ref('西安');
</script>

<template>
    <!-- html -->
    <h1>{{ msg }}</h1>
</template>

<style scoped>
/* 样式 */
h1 {
    color: red;
}
</style>
