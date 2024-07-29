<!-- 使用插值表达式 {{ msg }} 页面实现值 -->




<!-- 方法一:写数据
        export default：用于导出模块的默认值，这里是将data对象暴露出去给插值表达式使用
        export: 命名导出使用export关键字后跟变量名或函数名。一个模块只能有一个默认导出，但可以有多个命名导出，需要为它们指定名称。这些名称将在其他模块中用于导入
        export 与 export default 在导入时的区别:
                                                export--import 当使用命名导入时，必须确保导入的名称与导出模块中定义的名称完全匹配
                                                export default--可以为导入的模块指定任何名称，因为 export default 允许你在导入时使用任意名称
 -->
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
