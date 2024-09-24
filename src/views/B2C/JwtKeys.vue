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

const JwtKeys = ref([
    {
        kid: '',
        nbf: '',
        use: '',
        kty: '',
        e: '',
        n: ''
    }
])

const props = defineProps({
    jwtKeys: {
        type: Array as () => any
    }
});

function getOriginalData<T>(obj: T): T {
    // 如果 obj 不是对象，直接返回  
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // 使用 toRaw 获取原始对象  
    const rawObj = toRaw(obj);

    // 如果 rawObj 是 Proxy 对象，继续递归处理  
    if (rawObj !== obj) {
        return getOriginalData(rawObj);
    }

    // 处理嵌套对象  
    if (Array.isArray(rawObj)) {
        return rawObj.map(item => getOriginalData(item)) as unknown as T; // 处理数组  
    } else {
        const result: Record<string, any> = {}; // 创建一个新的对象  
        for (const key in rawObj) {
            if (rawObj.hasOwnProperty(key)) {
                result[key] = getOriginalData(rawObj[key]);
            }
        }
        return result as T; // 返回处理后的对象  
    }
}

// 用于提取原始数组的函数  
function flattenArray<T>(arr: T[]): T[] {
    return arr.reduce<T[]>((acc, item) => {
        if (Array.isArray(item)) {
            acc.push(...flattenArray(item)); // 递归处理嵌套数组  
        } else {
            acc.push(item);
        }
        return acc;
    }, []);
}

// 使用示例  
watch(() => props.jwtKeys, (newVal) => {
    if (newVal != null) {
        console.log("JwtKeys", JwtKeys.value);
        const originalData = getOriginalData(newVal); // 递归获取原始数据  

        // 假设 originalData 是多层嵌套的数组，提取原始数组  
        const flattenedArray = flattenArray(originalData as any[]);

        console.log('props.jwtKeys changed:', flattenedArray);

        // 将 newVal 多余的外层 proxy 去掉  
        JwtKeys.value = flattenedArray; // 更新为提取后的原始数组  
        console.log('JwtKeys updated:', JwtKeys.value);
    }
}, { deep: true, immediate: true });

// 使用defineEmits注册一个自定义事件
const emit = defineEmits(["getJwtKeys"])

// 点击事件触发emit，去调用我们注册的自定义事件getValue,并传递value参数至父组件
const transJwtKeys = () => {
    ElMessage.success('保存成功')
    emit("getJwtKeys", JwtKeys.value)
}


</script>

<style scoped>
.Jwt-container {
    padding: 20px;
}
</style>