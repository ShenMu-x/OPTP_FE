import _axios from '../axios';
import { ResType, ListRes } from '../type';
import { CourseType } from '@/type';
import { fmatDate, fmatTime } from '../../helper';
import { packCourse } from './pack';
import { packError, packEmptyData, packPageRes } from "../pack";

// 获取学习课程
export const getCoursesStudy: (params: {
    pageCurrent: number,
    pageSize: number
}) => ResType<ListRes<CourseType>> = (params) => {
    return _axios.get(`/web/course/study?pageCurrent=${params.pageCurrent}&pageSize=${params.pageSize}`)
        .then(res => packPageRes(res, packCourse))
        .catch(packError)
}

// 课程签到
export const attendCourse: (params: {
    courseId: number,
    secretKey: string,
}) => ResType<any> = (params) => {
    return _axios({
        method: "POST",
        url: "/web/course/attend",
        data: params
    })
        .then(packEmptyData)
        .catch(packError)
}
