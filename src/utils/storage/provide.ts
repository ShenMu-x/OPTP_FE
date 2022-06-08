interface editInfoParams {
    realName?: string,
    major?: string,
    organization?: string,
    gender?: number,
    grade?: number,
    college?: string
}
export enum ProvideKey {
    USER = 'user',
    EDIT_USER_INFO = 'editUserInfo',
    EDIT_USER_AVATAR = 'editAvatar'
}
export type editUserInfoType = (params: editInfoParams) => void;
export type editAvatarType = (url: string) => void;
export const emptyEditInfoMethod: editUserInfoType = params => {
    console.log('error for empty editUserInfo')
}
export const emptyEditAvatarMethod: editAvatarType = url => {
    console.log('error for empty editUserInfo')
}