/* 公共业务pack方法 */
import { DEFAULT_AVATAR } from "../option";

// 编码时间打包
export const packCodingTime: (codingTimeList: any[]) => any[] = (codingTimeList) => {
    return codingTimeList.map((item: { date: string, time: number }) => [item.date, item.time]) ?? []
}

// 用户信息打包
export const packAccountInfo = (info: {
    user_id: number;
    email: string;
    num: string;
    real_name: string;
    avatar_url: string;
    gender: number;
    major: string;
    organization: string;
    grade: number;
    college: string;
    role: number;
}) => ({
    userId: info.user_id,
    email: info.email,
    num: info.num,
    realName: info.real_name,
    avatarUrl: info.avatar_url || DEFAULT_AVATAR,
    gender: info.gender,
    major: info.major,
    organization: info.organization,
    grade: info.grade,
    college: info.college,
    role: info.role
})
