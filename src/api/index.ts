import axios from 'axios';

// 创建axios实例
const instance = axios.create({
    baseURL: 'https://lyfirsttest.azurewebsites.net/api', // 设置基础URL
    timeout: 5000, // 设置请求超时时间
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
        console.log("安徽读卡汉武帝卡卡风格是客服更何况是东北更何况是客服思考过后色冯绍峰色色")
        console.log(sessionStorage.getItem("user_impersonation_token"))
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