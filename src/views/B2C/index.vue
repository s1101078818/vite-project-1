<template>
    <div class="dropdown-container">
        <el-dropdown split-button type="primary">
            <span class="el-dropdown-link">
                {{ buttonName }}
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-scrollbar height="400px">
                        <el-dropdown-item v-for="provider in providers" :key="provider.tenantId"
                            @click="handleClick(provider)">
                            {{ provider.name }}
                        </el-dropdown-item>
                    </el-scrollbar>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
    <el-tabs v-model="activeName" class="B2C-tabs" style="margin-left: 20px;">
        <el-tab-pane label="B2C租户管理" name="first">
            <B2C></B2C>
        </el-tab-pane>
        <el-tab-pane label="JwtKeys" name="second">
            <JwtKeys :jwtKeys="jwtKeys"></JwtKeys>
        </el-tab-pane>
        <el-tab-pane label="JwtOpenConfig" name="third">
            <JwtOpenConfig :jwtOpenConfig="jwtOpenConfig"></JwtOpenConfig>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import B2C from '../B2C/B2C.vue'
import JwtKeys from './JwtKeys.vue';
import JwtOpenConfig from './JwtOpenConfig.vue';
import { getAccessProvider } from '../../api/home';
import axios from 'axios';

const buttonName = ref('请选择接入商')
const providers = reactive<Provider[]>([])
interface Provider {
    tenantId: string;
    name: string;
}

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

const activeName = ref('first')

const handleClick = (data: any) => {
    buttonName.value = data.name
    GetAccessProvider(data.tenantId);
}

const GetAccessProvider = (tenantId: string) => {
    getAccessProvider(tenantId).then(response => {
        form.value = response.data
        console.log("这里是form", form.value);
        jwtKeys.value = response.data.jwtKeys
        jwtOpenConfig.value = response.data.jwtOpenConfig
    }).catch(error => {
        console.log('There was a problem with your fetch operation:', error);
        // 在这里处理错误
    });
}

// 获得SaaS租户列表
const getSaaSTenantList = () => {
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
            providers.push({
                tenantId: response.data.data[i].id,
                name: response.data.data[i].name,
            });
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

.dropdown-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
}

.el-dropdown {
    margin-right: auto;
    /* 将下拉菜单推到右侧 */
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>