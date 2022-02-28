import _axios from '../axios';
import { ResType } from '../type';

export const getScoreExport: (courseId: number) => ResType<any> = (courseId) => {
    return _axios({
        method: 'GET',
        url: `/web/course/score/export/${courseId}`
    }).then(res => {
        console.log('scoreFile', res.data);
        return { code: 0 }
    }).catch(err => {
        return { code: -1 }
    })
}

const packScore = (item: any) => ({
    userId: item.user_id,
    email: item.email,
    num: item.num,
    realName: item.real_name,
    avatarUrl: item.avatar_url,
    gender: item.gender,
    major: item.major,
    organization: item.organization,
    avgScore: item.avg_score,
    shallCheckIn: item.shall_check_in,
    ackCheckIn: item.act_check_in,
})

export const getScore: (params: {
    pageCurrent: number,
    pageSize: number,
    courseId: number
}) => ResType<any> = (params) => {
    return _axios({
        method: 'GET',
        url: '/web/course/score',
        params,
    }).then(res => {
        return {
            code: 0,
            data: {
                records: res.data?.data?.records?.map((item: any) => packScore(item)) || [],
                pageInfo: res.data?.data?.page_info
            }
        }
    }).catch(err => ({
        code: -1
    }))
}