import axios, { AxiosRequestConfig } from "axios";
import { getAccessToken } from "../storage";
import { HttpCode, Code } from './code';
import { baseURL } from "../option";
import {
    clearAuthAndRedirect,
    REQUEST_REFRESH_TOKEN_URL,
    refreshAccessToken,
    getIsTokenRefreshing,
    pushRetryRequset,
    clearRetryQueue
} from './refreshToken';

const axiosConfig = {
    baseURL,
    timeout: 8 * 1000,
    withCredentials: true,
    headers: {}
}
const _axios = axios.create(axiosConfig);

// 请求拦截器
_axios.interceptors.request.use(
    function (config: AxiosRequestConfig) {
        if (config?.headers) config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
        return config;
    });

// 响应拦截器
_axios.interceptors.response.use(
    response => (response),
    error => {
        if (error.response) {
            const statusCode = error.response.status;
            if (statusCode === HttpCode.NoAuth) {
                return new Promise((resolve, reject) => {
                    let { config } = error.response;
                    if (config.url === REQUEST_REFRESH_TOKEN_URL) {
                        clearRetryQueue();
                        clearAuthAndRedirect();
                        reject(error);
                    } else {
                        if (!getIsTokenRefreshing()) refreshAccessToken();
                        pushRetryRequset(() => resolve(_axios(config)));
                    }
                })
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