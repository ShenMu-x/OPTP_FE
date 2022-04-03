import axios, { AxiosRequestConfig } from "axios";
import { getLocalStorage, clearTokenAndRole, LocalVal } from "../storage";
import { HttpCode, Code } from './code';
import { baseURL } from "../option";
import router from "@/router";

const axiosConfig = {
    baseURL,
    timeout: 5000,
    headers: {},
}
const _axios = axios.create(axiosConfig);

// 请求拦截器
_axios.interceptors.request.use(
    function (config: AxiosRequestConfig) {
        if (config?.headers) config.headers['Authorization'] = `Bearer ${getLocalStorage(LocalVal.AccessToken)}`;
        return config;
    });

// 响应拦截器
_axios.interceptors.response.use(
    response => (response),
    error => {
        if (error.response) {
            const statusCode = error.response.status;
            if (statusCode === HttpCode.NoAuth) {
                clearTokenAndRole();
                router.push({ path: '/login' });
            } else if (statusCode === HttpCode.ServerError) {
                error.response.data = {
                    code: HttpCode.ServerError,
                    data: {
                        message: '服务器异常, 请稍后重试'
                    }
                }
            }
            return Promise.reject(error);
        }
    }
);

export default _axios;