import LocalVal from "./type";
export const getToken = () => {
    return localStorage.getItem(LocalVal.Token) ?? '';
}

export const setToken = (token: string) => {
    localStorage.setItem(LocalVal.Token, token ?? '');
    return token;
}

export const rmToken = () => {
    localStorage.removeItem(LocalVal.Token);
}

export const getRole = () => {
    // 解密过程
    return parseInt(localStorage.getItem(LocalVal.Role) ?? '0');
}

export const setRole = (role: string) => {
    localStorage.setItem(LocalVal.Role, role ?? '0');
    return role;
}

export const rmRole = () => {
    localStorage.removeItem(LocalVal.Role);
}