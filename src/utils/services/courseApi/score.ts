import _axios from '../axios';
import { ResType, ListRes } from '../type';
import { packScore } from './pack';

// 导出成绩
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

// 获取课程学生成绩
export const getScoreAll: (params: {
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