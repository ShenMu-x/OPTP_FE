import _axios from "./axios";
import { ROUTE_NAME } from "../../router/routeName";
import { clearTokens, refreshTokens } from '../helper';
import { getRefreshToken } from "../storage";

export const REQUEST_REFRESH_TOKEN_URL = '/web/refresh';

export const clearAuthAndRedirect = () => {
    clearTokens();
    location.href = `${location.origin}/${ROUTE_NAME.LOGIN}`
}

let requestRetryQueue: any[] = []; // 任务列表，多个请求同时过期，需保留请求
export const pushRetryRequset = (request: any) => {
    requestRetryQueue.push(request)
}
export const retryRequestQueue = () => {
    requestRetryQueue.forEach((request: any) => request()); // 依次执行队列任务
    requestRetryQueue = [];
}
export const clearRetryQueue = () => requestRetryQueue = [];

let isTokenRefreshing = false; // 维护刷新状态
export const getIsTokenRefreshing = () => isTokenRefreshing;

const refresh = () => {
    return _axios({
        method: 'POST',
        url: REQUEST_REFRESH_TOKEN_URL,
        data: {
            refresh_token: getRefreshToken()
        }
    })
}
export const refreshAccessToken = async () => {
    if (isTokenRefreshing) return; // 标记刷新状态，防止多次刷新
    try {
        isTokenRefreshing = true;
        const res = await refresh();
        if (res.data) {
            refreshTokens(res.data?.data?.token, res.data?.data?.refresh_token)
            retryRequestQueue();
        }
    } catch (e) {
        clearRetryQueue();
        clearAuthAndRedirect();
    }
    finally { isTokenRefreshing = false; }
}