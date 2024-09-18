<template>
    <div class="common-layout">
        <el-container>
            <el-aside class="fixed-aside">
                <Aside></Aside>
            </el-aside>
            <el-container class="main-container">
                <el-header class="header">
                    <Header></Header>
                </el-header>
                <el-main class="main"><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import Aside from './aside.vue';
import Header from './header.vue';
</script>


<style scoped>
.common-layout {
    height: 100vh;
    /* 设置父容器高度为视口高度 */
}

.fixed-aside {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 250px;
    /* 根据需要调整宽度 */
    background-color: #f0f2f5;
    /* 根据需要调整背景颜色 */
    overflow-y: auto;
    /* 如果侧边栏内容超出，允许滚动 */
}

.main-container {
    /* margin-left: 100px; */
    /* 确保内容区域不会与侧边栏重叠 */
    height: 100%;
    /* 设置内容区域高度为100% */
}

.main {
    height: 100%;
    /* 设置主内容区域高度为100% */
    padding: 20px;
    /* 根据需要调整内边距 */
}
</style>