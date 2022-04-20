export type userInfoType = {
    userId?: number,
    email?: string,
    num?: string,
    realName?: string,
    major?: string,
    organization?: string,
    gender?: number,
    avatarUrl?: string,
}

export const emptyUserInfo: userInfoType = {
    email: '',
    userId: 0,
    num: '',
    realName: '',
    avatarUrl: '',
    gender: 0,
    major: '',
    organization: ''
}