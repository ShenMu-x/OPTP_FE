import _axios from '../../axios';
import { ResType, ListRes } from '../../type';
import { CourseType } from '@/type';
import { packCourse } from '../pack';
import { packError, packPageRes } from "../../pack";

// 获取学习课程
export const getStudyCourseList: (params: {
    pageCurrent: number,
    pageSize: number
}) => ResType<ListRes<CourseType>> = (params) => {
    return _axios.get(`/web/course/study?pageCurrent=${params.pageCurrent}&pageSize=${params.pageSize}`)
        .then(res => packPageRes(res, packCourse))
        .catch(packError)
}