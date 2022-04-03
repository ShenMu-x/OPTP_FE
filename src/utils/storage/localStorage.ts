export enum LocalVal {
    AccessToken= '__ACCESS',
    RefreshToken='__REFRESH',
    Role = '__ROLE',
};

export const getLocalStorage = (key: LocalVal) => {
    return localStorage.getItem(key);
}
export const setLocalStorage = (key: LocalVal, value: string) => {
    return localStorage.setItem(key, value);
}
export const removeLocalStorage = (key: LocalVal) => {
    return localStorage.removeItem(key);
}
export const clearTokenAndRole = () => {
    removeLocalStorage(LocalVal.AccessToken);
    removeLocalStorage(LocalVal.RefreshToken);
    removeLocalStorage(LocalVal.Role);
}