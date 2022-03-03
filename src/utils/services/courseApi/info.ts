import _axios from '../axios';
import { ResType, ListRes } from '../type';
import { CourseType } from '@/type';
import { packCourse, packRecords } from './pack';
import { packError, packEmptyData } from "../pack";

// 获取课程列表
export const getCoursesAll: (params: {
    pageCurrent: number,
    pageSize: number
}) => ResType<ListRes<CourseType>> = (params) => {
    return _axios.get(`/web/course?pageCurrent=${params.pageCurrent}&pageSize=${params.pageSize}`)
        .then(value => {
            return {
                code: 0,
                data: {
                    records: packRecords(value.data.data.records),
                    pageInfo: value.data.data.page_info
                }
            }
        })
        .catch(packError)
}

// 根据课程id获得课程信息
export const getCourseById: (params: {
    courseId: number
}) => ResType<{ course: CourseType }> = (params) => {
    return _axios.get(`/web/course/${params.courseId}`)
        .then(value => {
            return {
                code: 0,
                data: {
                    course: packCourse(value.data.data)
                }
            }
        })
        .catch(packError)
}
