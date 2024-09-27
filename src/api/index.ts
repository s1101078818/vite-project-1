import axios from 'axios';

// 创建axios实例
const instance = axios.create({
    baseURL: 'https://lyfirsttest.azurewebsites.net/api/',
    // baseURL: 'http://192.168.31.142:7188/api/', // 设置基础URL
    timeout: 20000, // 设置请求超时时间
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + sessionStorage.getItem("user_impersonation_token")
    }
});

// 请求拦截器
instance.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么，比如添加token
        const token = sessionStorage.getItem("user_impersonation_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response.data;
    },
    error => {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

// 封装get请求
export const get = (url: string, params?: object) => {
    return instance.get(url, params);
};

// 封装post请求
export const post = (url: string, params?: object) => {
    return instance.post(url, { params });
};

// 封装put请求
export const put = (url: string, params?: object) => {
    return instance.put(url, params);
};

// 封装delete请求
export const del = (url: string, params?: object) => {
    return instance.delete(url, { params });
};

export default instance;