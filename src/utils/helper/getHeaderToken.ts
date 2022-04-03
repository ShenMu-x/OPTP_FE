import { getLocalStorage, LocalVal } from '../storage';

export const wrapHeaderWithToken = (params?: any) => {
    return {
        ...params,
        'Authorization': `Bearer ${getLocalStorage(LocalVal.AccessToken)}`
    }
}