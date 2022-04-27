import { userInfoType } from '@/type';
export enum ConfigVal {
    USER = 'user'
}
type ConfigType = {
    [ConfigVal.USER]?: userInfoType
}

const config: ConfigType = {};

export const getRoleInConfig = () => config[ConfigVal.USER]?.role;
export const getUserInConfig = () => config[ConfigVal.USER];
export const setUserInConfig = (user: userInfoType) => config[ConfigVal.USER] = user;