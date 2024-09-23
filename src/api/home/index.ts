import axios from '../index'
// namespace AccessProvider {
//     export interface AccessProvider {
//         id: string,
//         name: string,
//         deploymentType: number,
//         isEnable: number,
//         azureTenantId: string,
//         webApiClientId: string,
//         spaApiScopes: string,
//         graphClientSecret: string,
//         webApiAud: string,
//         spaClientId: string,
//         spaBindDomain: string,
//         clientId: string,
//         namesSignUpSignIn: string,
//         authoritiesSignUpSigninAuthority: string,
//         apiscopes: string,
//         authorityDomain: string,
//         namesEditProfile: string
//     }
// }

// 用户获取接入商
export const getAccessProvider = (params: string) => {
    // const data = JSON.parse(params);
    const data = {
        tenantId: params
    }
    // 返回的数据格式可以和服务端约定
    return axios.post('/GetAccessProviderById', data);
}
// 获得所有接入商
export const getAllAccessProvider = () => {
    // 返回的数据格式可以和服务端约定
    return axios.get('/GetAllAccessProvider');
}

// 用户新增
export const addAccessProvider = (params: any) => {
    // const data = JSON.parse(params);
    // 返回的数据格式可以和服务端约定
    return axios.post('/AddAccessProvider', params);
}

// 修改
export const updateAccessProvider = (params: any) => {
    return axios.post('/UpdateAccessProvider', params);
}

// 获得SaaS模板
export const getSaaSAccessProviderTemplate = () => {
    return axios.get('/GetSaaSAccessProviderTemplate');
}

// 获取jwt配置信息
export const updateAccessProviderJwtDataById = (params: any) => {
    return axios.post('/UpdateAccessProviderJwtDataById', params);
}