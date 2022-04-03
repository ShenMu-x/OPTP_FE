export enum ConfigVal {
    isShowPoint = 'isShowPoint'
}
type ConfigType = {
    [propName in ConfigVal]?: any;
}

const config: ConfigType = {};

export const getConfig = (key: ConfigVal) => {
    return config[key];
}
export const setConfig = (key: ConfigVal, value: any) => {
    config[key] = value;
}