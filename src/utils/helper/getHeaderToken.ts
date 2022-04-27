import { getAccessToken } from '../storage';

export const wrapHeaderWithToken = (params?: any) => {
    return {
        ...params,
        'Authorization': `Bearer ${getAccessToken()}`
    }
}