import _axios from '../../axios';
import { ResType, ListRes } from '../../type';
import { packError, packEmptyData, packPageRes } from "../../pack";

export type ScoreType = {
    userId: number,
    email: string,
    num: string,
    realName: string,
    avatarUrl: string,
    gender: number,
    major: string,
    organization: string,
    avgScore: number,
    shouldCheckIn: number,
    ackCheckIn: number,
}

export const packScore = (item: any) => ({
    userId: item.user_id,
    email: item.email,
    num: item.num,
    realName: item.real_name,
    avatarUrl: item.avatar_url,
    gender: item.gender,
    major: item.major,
    organization: item.organization,
    avgScore: item.avg_score,
    shouldCheckIn: item.shall_check_in,
    ackCheckIn: item.act_check_in,
})

// 导出成绩
export const exportScoreFile: (courseId: number) => ResType<''> = (courseId) => {
    return _axios({
        method: 'GET',
        url: `/web/course/score/export/${courseId}`
    })
        .then(packEmptyData)
        .catch(packError)
}

// 获取课程学生成绩
export const getCourseScoreList: (params: {
    pageCurrent: number,
    pageSize: number,
    courseId: number
}) => ResType<ListRes<ScoreType>> = (params) => {
    return _axios({
        method: 'GET',
        url: '/web/course/score',
        params,
    })
        .then(res => packPageRes(res, packScore))
        .catch(packError)
}