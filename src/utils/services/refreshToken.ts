import _axios from "./axios";
import { clearTokens, refreshTokens } from '../helper';
import { getRefreshToken } from "../storage";

export const REQUEST_REFRESH_TOKEN_URL = '/web/refresh';

export const clearAuthAndRedirect = () => {
    clearTokens();
    location.href = `${location.origin}/login`
}

let requestRetryQueue: any[] = [];
export const pushRetryRequset = (request: any) => {
    requestRetryQueue.push(request)
}
export const retryRequestQueue = () => {
    requestRetryQueue.forEach((request: any) => request())
    requestRetryQueue = [];
}
export const clearRetryQueue = () => requestRetryQueue = [];
let isTokenRefreshing = false;
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
    if (isTokenRefreshing) return;
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