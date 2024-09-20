<template>
    <div class="common-layout">
        <el-container class="container">
            <el-aside class="fixed-aside">
                <Aside></Aside>
            </el-aside>
            <el-container class="main-container">
                <el-header class="header">
                    <Header></Header>
                </el-header>
                <el-main class="main">
                    <!-- <div class="content-wrapper">
                        <router-view></router-view>
                    </div> -->
                    <router-view></router-view>
                </el-main>
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

.container {
    display: flex;
    height: 100%;
}

.fixed-aside {
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
    width: 100%;
}

.header {
    background-color: #fff;
    /* 根据需要调整背景颜色 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* 根据需要调整阴影 */
    height: 62px;
}

.main {
    margin-top: 10px;
    padding: 0;
    /* 根据需要调整内边距 */
    border: 0;
}
</style>