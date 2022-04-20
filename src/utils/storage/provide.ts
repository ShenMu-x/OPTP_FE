interface editInfoParams {
    realName?: string,
    major?: string,
    organization?: string,
    gender?: number
}
export enum ProvideKey {
    USER = 'user',
    EDIT_USER_INFO = 'editUserInfo',
    EDIT_USER_AVATAR = 'editAvatar'
}
export type editUserInfoType = (params: editInfoParams) => void;
export type editAvatarType = (url: string) => void;
export const emptyEditInfoMethod = (params: editInfoParams) => {
    console.log('error for empty editUserInfo')
}
export const emptyEditAvatarMethod = (url: string) => {
    console.log('error for empty editUserInfo')
}