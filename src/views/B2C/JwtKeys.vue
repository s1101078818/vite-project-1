<template>
    <div class="Jwt-container">
        <el-form>
            <!-- 表单内容 -->
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Kid">
                        <el-input v-model="JwtKeys.kid"></el-input>
                    </el-form-item>
                    <el-form-item label="Nbf">
                        <el-input v-model="JwtKeys.nbf"></el-input>
                    </el-form-item>
                    <el-form-item label="Use">
                        <el-input v-model="JwtKeys.use"></el-input>
                    </el-form-item>
                    <!-- 其他表单项 -->

                </el-col>
                <el-col :span="12">
                    <!-- 其他表单项 -->
                    <el-form-item label="Kty">
                        <el-input v-model="JwtKeys.kty"></el-input>
                    </el-form-item>
                    <el-form-item label="E">
                        <el-input v-model="JwtKeys.e"></el-input>
                    </el-form-item>
                    <el-form-item label="N">
                        <el-input v-model="JwtKeys.n"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, toRaw } from 'vue'
import { defineProps } from 'vue';

const JwtKeys = ref({
    kid: '',
    nbf: '',
    use: '',
    kty: '',
    e: '',
    n: ''
})


const props = defineProps({
    jwtKeys: {
        type: Object as () => any
    }
});

watch(() => props.jwtKeys, (newVal) => {
    if (toRaw(newVal)[0] != null) {
        console.log("JwtKeys", JwtKeys.value);
        console.log('props.jwtKeys changed:', toRaw(newVal)[0]);
        JwtKeys.value = toRaw(newVal)[0];
        console.log('JwtKeys updated:', JwtKeys.value);
    }
}, { deep: true, immediate: true });

</script>

<style scoped>
.Jwt-container {
    padding: 20px;
}
</style>