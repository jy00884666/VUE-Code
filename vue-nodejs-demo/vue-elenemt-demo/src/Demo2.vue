<!-- Container 布局容器 整合 menu 菜单 -->
<template>
    <div class="common-layout">
        <el-container>
            <!-- 左侧菜单 -->
            <el-aside width="400px">
                <!-- 菜单标签,router:表示点击跳转的连接,配置子路由器时填写连接地址 -->
                <el-menu default-active="/user/userInfo" class="el-menu-vertical-demo" @open="handleOpen"
                    @close="handleClose" router>
                    <!-- el-sub-menu 有子菜单的菜单,点击折叠展开 -->
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <Location />
                            </el-icon>
                            <span>用户中心</span>
                        </template>
                        <!-- el-menu-item 最叶子菜单,点击展示页面内容 -->
                        <el-menu-item index="/user/userInfo">
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
                            <span>实名认证</span>
                        </el-menu-item>
                        <el-sub-menu index="1-4">
                            <template #title>
                                <el-icon>
                                    <Setting />
                                </el-icon>
                                <span>权限管理</span>
                            </template>
                            <el-menu-item index="1-4-1">
                                <el-icon>
                                    <Setting />
                                </el-icon>
                                <span>菜单权限管理</span>
                            </el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                    <el-menu-item index="2">
                        <el-icon>
                            <IconMenu />
                        </el-icon>
                        <span>文章分类管理</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <el-icon>
                            <Document />
                        </el-icon>
                        <span>文章管理</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-icon>
                            <Help />
                        </el-icon>
                        <span>敬请期待</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <!-- 右侧主区域 -->
            <el-container>
                <!-- 头部区域 -->
                <el-header>
                    <div>程序员<strong>沙士杰</strong></div>
                    <!-- 下拉菜单 -->
                    <el-dropdown placement="bottom-end">
                        <span class="el-dropdown__box">
                            <el-avatar :src="avatar" />
                            <el-icon>
                                <CaretBottom />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
                                <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                                <el-dropdown-item command="password" :icon="EditPen">重制密码</el-dropdown-item>
                                <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-header>
                <!-- 中间区域 -->
                <el-main>
                    <!-- 使用router路由器,固定写法 -->
                    <router-view></router-view>
                </el-main>
                <!-- 底部区域 -->
                <el-footer>当程序员其实很简单</el-footer>
            </el-container>
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
    CaretBottom,
    SwitchButton,
    Help,
} from '@element-plus/icons-vue'

/**sub-menu 展开的回调 */
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
}

/**sub-menu 收起的回调 */
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
}

/* 头像样式导入 */
import { reactive, toRefs } from 'vue'

const state = reactive({
    avatar:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

const { avatar } = toRefs(state)

</script>

<style>
/* 顶部区域样式 */
.el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
        display: flex;
        align-items: center;

        .el-icon {
            color: #999;
            margin-left: 10px;
        }

        &:active,
        &:focus {
            outline: none;
        }
    }
}

/* 底部区域样式 */
.el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
}

</style>