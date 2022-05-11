import _axios from '../../axios';
import { ResType, ListRes } from '../../type';
import { packError, packPageRes } from "../../pack";
import { exportCsv } from '../../exportCsv';
import { packCodingTime } from '../../packCommon';

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
export const exportScore: (courseId: number) => ResType<{ csvData: any }> = (courseId) => {
    return exportCsv(`/web/course/score/export/${courseId}`);
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

export type codingTimeType = {
    userId: number,
    name: string,
    number: string,
    codingTime: Array<any>,
}
export const packCoding = (item: any) => ({
    userId: item.user_id,
    name: item.name,
    number: item.number,
    codingTime: packCodingTime(item.coding_time) ?? [],
})

const packCourseCodingTime = (item: any) => {
    return {
        userId: item.user_id,
        name: item.name,
        number: item.number,
        codingTime: packCodingTime(item.coding_time ?? [])
    }
}
// 获取课程学生编码时间表
export const getCourseCodingTime: (params: { courseId: number, pageSize: number, pageCurrent: number }) => ResType<any> = (params) => {
    return _axios({
        method: 'GET',
        url: `/web/coding_time/${params.courseId}`,
        params: {
            pageCurrent: params.pageCurrent,
            pageSize: params.pageSize
        }
    })
        .then(res => packPageRes(res, packCourseCodingTime))
        .catch(packError)
}