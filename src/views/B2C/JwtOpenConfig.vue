<template>
    <div class="JwtOpenConfig-container">
        <el-form>
            <!-- 表单内容 -->
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="issuer">
                        <el-input v-model="JwtOpenConfig.issuer"></el-input>
                    </el-form-item>
                    <el-form-item label="authorization_endpoint">
                        <el-input v-model="JwtOpenConfig.authorization_endpoint"></el-input>
                    </el-form-item>
                    <el-form-item label="token_endpoint">
                        <el-input v-model="JwtOpenConfig.token_endpoint"></el-input>
                    </el-form-item>
                    <!-- 其他表单项 -->
                </el-col>
                <el-col :span="12">
                    <!-- 其他表单项 -->
                    <el-form-item label="end_session_endpoint">
                        <el-input v-model="JwtOpenConfig.end_session_endpoint"></el-input>
                    </el-form-item>
                    <el-form-item label="jwks_uri">
                        <el-input v-model="JwtOpenConfig.jwks_uri"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="response_modes_supported">
                <el-tag type="primary" v-for="tag in JwtOpenConfig.response_modes_supported" :key="tag"
                    style="margin-right: 10px;">{{ tag
                    }}</el-tag>
            </el-form-item>
            <el-form-item label="response_types_supported">
                <el-tag type="primary" v-for="tag in JwtOpenConfig.response_types_supported" :key="tag"
                    style="margin-right: 10px;">{{ tag
                    }}</el-tag>
            </el-form-item>
            <el-form-item label="scopes_supported">
                <el-tag type="primary" v-for="tag in JwtOpenConfig.scopes_supported" :key="tag"
                    style="margin-right: 10px;">{{ tag
                    }}</el-tag>
            </el-form-item>
            <el-form-item label="subject_types_supported">
                <el-tag type="primary" v-for="tag in JwtOpenConfig.subject_types_supported" :key="tag"
                    style="margin-right: 10px;">{{ tag
                    }}</el-tag>
            </el-form-item>
            <el-form-item label="id_token_signing_alg_values_supported">
                <el-tag type="primary" v-for="tag in JwtOpenConfig.id_token_signing_alg_values_supported" :key="tag"
                    style="margin-right: 10px;">{{
                        tag
                    }}</el-tag>
            </el-form-item>
            <el-form-item label="token_endpoint_auth_methods_supported">
                <el-tag type="primary" v-for="tag in JwtOpenConfig.token_endpoint_auth_methods_supported" :key="tag"
                    style="margin-right: 10px;">{{
                        tag
                    }}</el-tag>
            </el-form-item>
            <el-form-item label="claims_supported">
                <el-tag type="primary" v-for="tag in JwtOpenConfig.claims_supported" :key="tag"
                    style="margin-right: 10px;">{{ tag
                    }}</el-tag>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, toRaw } from 'vue'
import { defineProps } from 'vue';
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

// watch(() => props.jwtOpenConfig, (newVal) => {
//     console.log("JwtOpenConfig", JwtOpenConfig.value);
//     console.log('props.jwtOpenConfig changed:', toRaw(newVal));
//     JwtOpenConfig.value = toRaw(newVal);
//     console.log('JwtOpenConfig updated:', JwtOpenConfig.value);
// }, { deep: true, immediate: true });

</script>

<style scoped>
.JwtOpenConfig-container {
    padding: 20px;
}
</style>