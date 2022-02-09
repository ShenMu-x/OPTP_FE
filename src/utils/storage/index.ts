import LocalVal from "./type";
export const getToken = () => {
    // 解密过程
    return localStorage.getItem(LocalVal.Token) ?? '';
}

export const setToken = (token: string) => {
    localStorage.setItem(LocalVal.Token, token);
    return token;
}