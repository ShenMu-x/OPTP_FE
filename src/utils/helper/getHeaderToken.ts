import { getToken } from '@/utils/storage';

export const wrapHeaderWithToken = (params?: any) => {
    return {
        ...params,
        'Authorization': `Bearer ${getToken()}`
    }
}