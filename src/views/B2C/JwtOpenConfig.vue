<template>
    <div class="JwtOpenConfig-container">
        <json-editor-vue class="config-editor" v-model="JwtOpenConfig" style="height: 600px;" />
    </div>
    <el-button type="primary" @click="transJwtOpenConfig">保存</el-button>
</template>

<script lang="ts" setup>
import { ref, watch, toRaw } from 'vue'
import { defineProps } from 'vue';
// @ts-ignore
import JsonEditorVue from 'json-editor-vue3'

const JwtOpenConfig = ref({
    issuer: '',
    authorization_endpoint: '',
    token_endpoint: '',
    end_session_endpoint: '',
    jwks_uri: '',
    response_modes_supported: [
    ],
    response_types_supported: [
    ],
    scopes_supported: [
    ],
    subject_types_supported: [
    ],
    id_token_signing_alg_values_supported: [
    ],
    token_endpoint_auth_methods_supported: [
    ],
    claims_supported: [
    ]
})

const props = defineProps({
    jwtOpenConfig: {
        type: Object as () => any
    }
});

watch(() => props.jwtOpenConfig, (newVal) => {
    // console.log("JwtOpenConfig", JwtOpenConfig.value);
    // console.log('props.jwtOpenConfig changed:', toRaw(newVal));
    JwtOpenConfig.value = toRaw(newVal);
    // console.log('JwtOpenConfig updated:', JwtOpenConfig.value);
}, { deep: true, immediate: true });

// 使用defineEmits注册一个自定义事件
const emit = defineEmits(["getJwtOpenConfig"])

// 点击事件触发emit，去调用我们注册的自定义事件getValue,并传递value参数至父组件
const transJwtOpenConfig = () => {
    ElMessage.success('保存成功')
    emit("getJwtOpenConfig", JwtOpenConfig.value)
}

</script>

<style scoped>
.JwtOpenConfig-container {
    padding: 20px;
}
</style>