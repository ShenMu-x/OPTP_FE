import axios, { AxiosRequestConfig } from "axios";
import { getToken, rmToken } from "../storage";
import router from "@/router";
import { ElMessage } from 'element-plus';

const axiosConfig = {
    baseURL: 'http://175.178.37.132:8081',
    timeout: 3000,
    headers: {},
}
const _axios = axios.create(axiosConfig);

// 请求拦截器
_axios.interceptors.request.use(
    function (config: AxiosRequestConfig) {

        if (config?.headers) {
            config.headers['Authorization'] = `Bearer ${getToken()}`;
        }

        return config;
    },
    function (error) {
        // req出错时报错
        error.response.data = {
            code: 500,
            data: {
                message: '服务器异常, 请稍后重试'
            }
        };
        return Promise.reject(error);
    }
);

// 响应拦截器
_axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401: {
                    // 401 无权限
                    rmToken();
                    router.push({ path: '/login' });
                    ElMessage({
                        showClose: false,
                        message: '登录态失效, 需重新登录',
                        type: 'error',
                        duration: 2000,
                    })
                    break;
                }
                case 500: {
                    // 500 服务器异常
                    error.response.data = {
                        code: 500,
                        data: {
                            message: '服务器异常, 请稍后重试'
                        }
                    }
                    break;
                }
            }
            return Promise.reject(error);
        }
    }
);

export default _axios;