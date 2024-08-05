<script setup>
// 导入Demo.vue文件
import Demo1 from "./Demo1.vue"
import Demo2 from "./Demo2.vue"
</script>

<template>
  <!-- html -->
  <!-- 引入html,使用了router路由器所以这里不需要手动引入了 -->
  <!-- <Demo1 />
    <Demo2 /> -->
  <!-- 使用router路由器,固定写法 -->
  <router-view></router-view>
</template>

<style scoped>
/* 样式 */
</style>
