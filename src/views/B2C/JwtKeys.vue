<template>
    <div class="Jwt-container">
        <json-editor-vue class="keys-editor" v-model="JwtKeys" style="height: 600px;" />
    </div>
    <el-button type="primary" @click="transJwtKeys">保存</el-button>
</template>

<script lang="ts" setup>
import { ref, watch, toRaw } from 'vue'
import { defineProps } from 'vue';
// @ts-ignore
import JsonEditorVue from 'json-editor-vue3'

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

// 使用defineEmits注册一个自定义事件
const emit = defineEmits(["getJwtKeys"])

// 点击事件触发emit，去调用我们注册的自定义事件getValue,并传递value参数至父组件
const transJwtKeys = () => {
    emit("getJwtKeys", JwtKeys.value)
}


</script>

<style scoped>
.Jwt-container {
    padding: 20px;
}
</style>