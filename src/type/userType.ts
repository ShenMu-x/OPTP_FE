import { DEFAULT_AVATAR } from "@/utils/option"
export type userInfoType = {
    userId?: number,
    email?: string,
    num?: string,
    realName?: string,
    major?: string,
    organization?: string,
    gender?: number,
    avatarUrl?: string,
    role?: number,
    college?: string,
    grade?: number
}

export const emptyUserInfo: userInfoType = {
    email: '',
    userId: 0,
    num: '',
    realName: '',
    avatarUrl: DEFAULT_AVATAR,
    gender: 0,
    major: '',
    organization: '',
    role: 0,
    college: '',
    grade: 0
}