<template>
    <div class="header">
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
                    <span class="username">{{ username }}</span>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logoutPopup">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
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
.header {
    position: fixed;
    top: 0;
    left: 250px;
    /* 与侧边栏宽度对齐 */
    right: 0;
    /* 使宽度铺满页面 */
    background-color: #fff;
    color: #333;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-info {
    display: flex;
    align-items: center;
    margin-left: auto;
    /* 将用户信息推到最右侧 */
}


.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
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