export enum LocalVal {
    AccessToken = '__ACCESS',
    RefreshToken = '__REFRESH',
};

export const getLocalStorage = (key: LocalVal) => localStorage.getItem(key)
export const setLocalStorage = (key: LocalVal, value: string) => localStorage.setItem(key, value)
export const removeLocalStorage = (key: LocalVal) => localStorage.removeItem(key)

export const getAccessToken = (defaultVal = "") => getLocalStorage(LocalVal.AccessToken) || defaultVal;
export const setAccessToken = (value = "") => setLocalStorage(LocalVal.AccessToken, value)
export const rmAccessToken = () => removeLocalStorage(LocalVal.AccessToken)

export const getRefreshToken = (defaultVal = "") => getLocalStorage(LocalVal.RefreshToken) || defaultVal;
export const setRefreshToken = (value = "") => setLocalStorage(LocalVal.RefreshToken, value)
export const rmRefreshToken = () => removeLocalStorage(LocalVal.RefreshToken)