<template>
    <h3 v-loading.fullscreen.lock="loading">编辑SaaS模板</h3>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="AzureTenantId">
                    <el-input v-model="form.azureTenantId" />
                </el-form-item>
                <el-form-item label="GraphClientId">
                    <el-input v-model="form.graphClientId" />
                </el-form-item>
                <el-form-item label="GraphClientSecret">
                    <el-input v-model="form.graphClientSecret" />
                </el-form-item>
                <el-form-item label="SPAApiScopes">
                    <el-input v-model="form.spaApiScopes" />
                </el-form-item>
                <el-form-item label="SPABindDomain">
                    <el-input v-model="form.spaBindDomain" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="SPAClientId">
                    <el-input v-model="form.spaClientId" />
                </el-form-item>
                <el-form-item label="WebApiAud">
                    <el-input v-model="form.webApiAud" />
                </el-form-item>
                <el-form-item label="WebApiClientId">
                    <el-input v-model="form.webApiClientId" />
                </el-form-item>
                <el-form-item label="ApplicationType">
                    <el-input v-model="form.applicationType" />
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getSaaSAccessProviderTemplate } from '../../api/home'
import { onMounted } from 'vue';

const loading = ref(false)

// do not use same name with ref
const form = ref({
    azureTenantId: '',
    category: '',
    deployType: 1,
    graphClientId: '',
    graphClientSecret: '',
    isEnable: true,
    id: '',
    policies: {
        apiScopes: [],
        authorities_editProfile_authority: '',
        authorities_signUpSignIn_authority: '',
        authorityDomain: '',
        clientId: '',
        names_editProfile: '',
        names_signUpSignIn: ''
    },
    spaApiScopes: [],
    spaBindDomain: '',
    spaClientId: '',
    tenantId: '',
    webApiAud: '',
    webApiClientId: '',
    applicationType: ''
})

const GetSaaSAccessProviderTemplate = () => {
    getSaaSAccessProviderTemplate().then(response => {
        // console.log("这里是SaaS模板");
        // console.log(response.data);
        // 在这里执行你的操作
        // 将response.data赋值给form
        form.value = {
            azureTenantId: response.data.azureTenantId,
            category: response.data.category,
            deployType: response.data.deployType,
            graphClientId: response.data.graphClientId,
            graphClientSecret: response.data.graphClientSecret,
            isEnable: response.data.isEnable,
            id: response.data.id,
            policies: {
                apiScopes: response.data.policies.apiScopes[0],
                authorities_editProfile_authority: response.data.policies.authorities_editProfile_authority,
                authorities_signUpSignIn_authority: response.data.policies.authorities_signUpSignIn_authority,
                authorityDomain: response.data.policies.authorityDomain,
                clientId: response.data.policies.clientId,
                names_editProfile: response.data.policies.names_editProfile,
                names_signUpSignIn: response.data.policies.names_signUpSignIn
            },
            spaApiScopes: response.data.spaApiScopes[0],
            spaBindDomain: response.data.spaBindDomain,
            spaClientId: response.data.spaClientId,
            tenantId: response.data.tenantId,
            webApiAud: response.data.webApiAud,
            webApiClientId: response.data.webApiClientId,
            applicationType: response.data.applicationType
        }
    })
}

onMounted(() => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
    }, 500);
    // GetSaaSAccessProviderTemplate();
})

</script>

<style scoped></style>