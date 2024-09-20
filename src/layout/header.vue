<template>
    <div class="header1">
        <!-- <div class="user-info">
            <el-avatar :size="32" class="mr-3"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <span class="username">User Name</span>
        </div> -->
        <div class="user-info">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-avatar :size="32" class="mr-3"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logoutPopup">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div class="username">
                {{ username }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMsal } from '../api/login/useMsal';
import { ref, onMounted } from 'vue'
const { instance } = useMsal();
const username = ref('');

const logoutPopup = () => {
    instance.logoutPopup({
        mainWindowRedirectUri: "/"
    });
    // 清空sessionStorage
    sessionStorage.clear();
    localStorage.clear();
}

onMounted(() => {
    // 在这里可以执行一些初始化操作
    const graphDataStr = sessionStorage.getItem('graphData');
    if (graphDataStr) {
        const graphData = JSON.parse(graphDataStr);
        username.value = graphData.displayName;
    }
})
</script>

<style scoped>
.header1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.user-info {
    display: flex;
    align-items: center;
    margin-top: 15px;
    margin-left: auto;
    /* 将用户信息推到最右侧 */
}

.username {
    font-size: 18px;
    margin-left: 10px;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-dropdown-link:hover {
    color: #66b1ff;
}


</style>