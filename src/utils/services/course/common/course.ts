import _axios from '../../axios';
import { ResType, ListRes } from '../../type';
import { CourseType } from '@/type';
import { packCourse } from '../pack';
import { packError, packErrorWrap, packPageRes } from "../../pack";

// 获取全部课程列表
export const getAllCourseList: (params: {
    pageCurrent: number,
    pageSize: number
}) => ResType<ListRes<CourseType>> = (params) => {
    return _axios.get(`/web/course?pageCurrent=${params.pageCurrent}&pageSize=${params.pageSize}`)
        .then(res => packPageRes(res, packCourse))
        .catch(packError)
}

// 根据课程id获取课程信息
export const getCourseById: (params: {
    courseId: number
}) => ResType<CourseType> = (params) => {
    return _axios.get(`/web/course/${params.courseId}`)
        .then(value => {
            return {
                code: 0,
                data: packCourse(value.data.data)
            }
        })
        .catch(err => packErrorWrap(err, [
            [-19999, '该课程不存在']
        ]))
}

// 根据课程名称模糊查询课程信息
export const searchCourseByName: (params: {
    courseName: string,
    pageSize: number,
    pageCurrent: number
}) => ResType<any> = (params) => {
    return _axios({
        method: 'GET',
        url: 'web/course/search',
        params
    })
        .then(res => packPageRes(res, packCourse))
        .catch(packError)
}
