<template>
    <div class="select-container" v-loading.fullscreen.lock="loading">
        <el-select v-model="value" filterable placeholder="Select" style="width: 240px" @change="handleChange(value)">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="primary" style="margin-left: 20px;"
            @click="UpdateAccessProviderJwtDataById">更新jwt配置</el-button>
    </div>
    <el-tabs v-model="activeName" class="B2C-tabs" style="margin-left: 20px;">
        <el-tab-pane label="B2C租户管理" name="first">
            <B2C :editForm="editForm" :isAdd="isAdd" :tenantId="tenantId" :jwtKeys="jwtKeys"
                :jwtOpenConfig="jwtOpenConfig">
            </B2C>
        </el-tab-pane>
        <el-tab-pane label="JwtKeys" name="second">
            <JwtKeys :jwtKeys="jwtKeys" @getJwtKeys="getJwtKeys"></JwtKeys>
        </el-tab-pane>
        <el-tab-pane label="JwtOpenConfig" name="third">
            <JwtOpenConfig :jwtOpenConfig="jwtOpenConfig" @getJwtOpenConfig="getJwtOpenConfig"></JwtOpenConfig>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import B2C from '../B2C/B2C.vue'
import JwtKeys from './JwtKeys.vue';
import JwtOpenConfig from './JwtOpenConfig.vue';
import { getAccessProvider, updateAccessProviderJwtDataById } from '../../api/home';
import axios from 'axios';


const value = ref('')
const loading = ref(false)

const fullscreenLoading = ref(false)
const openFullScreen1 = () => {
    fullscreenLoading.value = true
    setTimeout(() => {
        fullscreenLoading.value = false
    }, 2000)
}

interface ListItem {
    value: string
    label: string
}

const options = ref<ListItem[]>([])

interface JwtKey {
    kid: string;
    nbf: number;
    use: string;
    kty: string;
    e: string;
    n: string;
}

interface Policies {
    clientId: string;
    apiScopes: string[];
    authorityDomain: string;
    names_signUpSignIn: string;
    names_editProfile: string;
    authorities_signUpSignIn_authority: string;
    authorities_editProfile_authority: string;
}

interface JwtOpenConfig {
    issuer: string;
    authorization_endpoint: string;
    token_endpoint: string;
    end_session_endpoint: string;
    jwks_uri: string;
    response_modes_supported: string[];
    response_types_supported: string[];
    scopes_supported: string[];
    subject_types_supported: string[];
    id_token_signing_alg_values_supported: string[];
    token_endpoint_auth_methods_supported: string[];
    claims_supported: string[];
}

interface Data {
    id: string;
    deployType: number;
    tenantId: string;
    azureTenantId: string;
    graphClientId: string;
    graphClientSecret: string;
    spaBindDomain: string;
    spaClientId: string;
    spaApiScopes: string[];
    policies: Policies;
    webApiClientId: string;
    webApiAud: string;
    isEnable: boolean;
    jwtKeys: JwtKey[];
    jwtOpenConfig: JwtOpenConfig;
}

const form = ref<Data>({
    id: '',
    deployType: 0,
    tenantId: '',
    azureTenantId: '',
    graphClientId: '',
    graphClientSecret: '',
    spaBindDomain: '',
    spaClientId: '',
    spaApiScopes: [],
    policies: {
        clientId: '',
        apiScopes: [],
        authorityDomain: '',
        names_signUpSignIn: '',
        names_editProfile: '',
        authorities_signUpSignIn_authority: '',
        authorities_editProfile_authority: '',
    },
    webApiClientId: '',
    webApiAud: '',
    isEnable: true,
    jwtKeys: [],
    jwtOpenConfig: {
        issuer: '',
        authorization_endpoint: '',
        token_endpoint: '',
        end_session_endpoint: '',
        jwks_uri: '',
        response_modes_supported: [],
        response_types_supported: [],
        scopes_supported: [],
        subject_types_supported: [],
        id_token_signing_alg_values_supported: [],
        token_endpoint_auth_methods_supported: [],
        claims_supported: [],
    }
})

const editForm = ref({
    azureTenantId: '',
    category: '',
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
    webApiClientId: ''
})

const jwtKeys = ref<JwtKey[]>([])

const jwtOpenConfig = ref<JwtOpenConfig>({
    issuer: '',
    authorization_endpoint: '',
    token_endpoint: '',
    end_session_endpoint: '',
    jwks_uri: '',
    response_modes_supported: [],
    response_types_supported: [],
    scopes_supported: [],
    subject_types_supported: [],
    id_token_signing_alg_values_supported: [],
    token_endpoint_auth_methods_supported: [],
    claims_supported: [],
})

const isAdd = ref(false)
const tenantId = ref('')

const activeName = ref('first')

const handleChange = (data: string) => {
    tenantId.value = data
    GetAccessProvider(data);
}

const GetAccessProvider = (tenantId: string) => {
    getAccessProvider(tenantId).then(response => {
        // 当response.data为空时，新增，不为空时，执行编辑
        if (response.data == null) {
            isAdd.value = true
            jwtKeys.value = [{
                kid: '',
                // @ts-ignore
                nbf: '',
                use: '',
                kty: '',
                e: '',
                n: ''
            }]
            jwtOpenConfig.value = {
                issuer: '',
                authorization_endpoint: '',
                token_endpoint: '',
                end_session_endpoint: '',
                jwks_uri: '',
                response_modes_supported: [],
                response_types_supported: [],
                scopes_supported: [],
                subject_types_supported: [],
                id_token_signing_alg_values_supported: [],
                token_endpoint_auth_methods_supported: [],
                claims_supported: [],
            }
        } else {
            isAdd.value = false
            form.value = response.data
            jwtKeys.value = response.data.jwtKeys
            jwtOpenConfig.value = response.data.jwtOpenConfig
            // response.data去除jwtKeys和jwtOpenConfig
            delete response.data.jwtKeys
            delete response.data.jwtOpenConfig
            editForm.value = response.data
        }
    }).catch(error => {
        console.log('There was a problem with your fetch operation:', error);
        // 在这里处理错误
    });
}

// 获得SaaS租户列表
const getSaaSTenantList = () => {
    loading.value = true
    const instance = axios.create({
        baseURL: 'https://paas-mgw.apim.xmindit.com/saas-uuas/tenantlist', // 设置基础URL
        timeout: 5000, // 设置请求超时时间
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'saas-uuas': '4604809207774a5d9aa18d5c8df88aac'
        }
    });
    instance.post('', {}).then(response => {
        // 在这里执行你的操作
        // 将response.data赋值给providers
        for (let i = 0; i < response.data.data.length; i++) {
            // providers.push({
            //     tenantId: response.data.data[i].id,
            //     name: response.data.data[i].name,
            // });
            // 赋值给options
            options.value.push({
                value: response.data.data[i].id,
                label: response.data.data[i].name
            })
        }
        loading.value = false
    })
}

const getJwtKeys = (value: any) => {
    jwtKeys.value = [value];
    // console.log("8888888888888888888888888");
    // console.log(jwtKeys.value);
}

const getJwtOpenConfig = (value: any) => {
    jwtOpenConfig.value = value;
    // console.log(jwtOpenConfig.value);
}

const UpdateAccessProviderJwtDataById = () => {
    loading.value = true
    const data = {
        tenantId: tenantId.value
    }
    updateAccessProviderJwtDataById(data).then(response => {
        if (response.status == 200) {
            loading.value = false
            ElMessage({
                message: '更新jwt信息成功',
                type: 'success',
            })
            // 重新获取数据
            GetAccessProvider(tenantId.value);
        } else {
            loading.value = false
            ElMessage({
                message: '更新jwt信息失败',
            })
        }
    })
}

onMounted(() => {
    getSaaSTenantList();
})

</script>

<style scoped>
.B2C-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.select-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
}

.el-select {
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>