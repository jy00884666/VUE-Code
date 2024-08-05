<!-- Container 布局容器 整合 menu 菜单 -->
<template>
    <div class="common-layout">
        <el-container>
            <!-- 左侧菜单 -->
            <el-aside width="400px">
                <!-- 菜单标签 -->
                <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                    <!-- el-sub-menu 有子菜单的菜单,点击折叠展开 -->
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>用户中心</span>
                        </template>
                        <!-- el-menu-item 最叶子菜单,点击展示页面内容 -->
                        <el-menu-item index="1-1">
                            <el-icon>
                                <User />
                            </el-icon>
                            <span>修改个人资料</span>
                        </el-menu-item>
                        <el-menu-item index="1-2">
                            <el-icon>
                                <EditPen />
                            </el-icon>
                            <span>修改密码</span>
                        </el-menu-item>
                        <el-menu-item index="1-3">
                            <el-icon>
                                <Crop />
                            </el-icon>
                            <span>实名认证</span></el-menu-item>
                        <el-sub-menu index="1-4">
                            <template #title>
                                <el-icon>
                                    <setting />
                                </el-icon>
                                <span>权限管理</span>
                            </template>
                            <el-menu-item index="1-4-1">
                                <el-icon></el-icon>
                                <span>菜单权限管理</span>
                            </el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                    <el-menu-item index="2">
                        <el-icon>
                            <icon-menu />
                        </el-icon>
                        <span>文章分类管理</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>文章管理</span>
                    </el-menu-item>
                    <el-menu-item index="4" disabled>
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>敬请期待</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <!-- 右侧主区域 -->
            <el-main>主显示区域</el-main>
        </el-container>
    </div>

</template>

<script lang="ts" setup>
/* 菜单图标样式导入 */
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
    User,
    EditPen,
    Crop,
} from '@element-plus/icons-vue'

/**sub-menu 展开的回调 */
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
}

/**sub-menu 收起的回调 */
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
}

</script>

<style>

</style>