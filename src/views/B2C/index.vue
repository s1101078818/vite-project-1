<template>
    <el-tabs v-model="activeName" class="B2C-tabs">
        <el-tab-pane label="B2C租户管理">
            <B2C></B2C>
        </el-tab-pane>
        <el-tab-pane label="设置1" name="second">Config</el-tab-pane>
        <el-tab-pane label="设置2" name="third">Role</el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import B2C from '../B2C/B2C.vue'

const activeName = ref('first')


</script>

<style scoped>
.B2C-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>