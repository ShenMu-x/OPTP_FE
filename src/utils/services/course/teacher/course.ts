import _axios from '../../axios';
import { ResType, ListRes } from '../../type';
import { CourseType } from '@/type';
import { packCourse } from '../pack';
import { packError, packEmptyData, packPageRes } from "../../pack";

// 创建课程
interface createCourseReq {
    courseDes: string,
    secretkey: string,
    courseName: string,
    picUrl: string,
    language: number,
    needAudit: boolean
}
export const createCourse: (params: createCourseReq) => ResType<any> = (params) => {
    return _axios({
        method: "POST",
        url: "/web/course",
        data: {
            courseDes: params.courseDes,
            secretkey: params.secretkey,
            courseName: params.courseName,
            picUrl: params.picUrl,
            language: params.language,
            need_audit: params.needAudit
        },
    })
        .then(packEmptyData)
        .catch(packError)
}

// 修改课程信息
interface editCourseReq {
    courseId: number,
    courseDes: string,
    secretkey: string,
    courseName: string,
    picUrl: string,
    language: number,
    needAudit: boolean
}
export const editCourse: (params: editCourseReq) => ResType<any> = (params) => {
    return _axios({
        method: "PUT",
        url: "/web/course",
        data: {
            courseId: params.courseId,
            courseDes: params.courseDes,
            secretkey: params.secretkey,
            courseName: params.courseName,
            picUrl: params.picUrl,
            language: params.language,
            need_audit: params.needAudit
        },
    })
        .then(packEmptyData)
        .catch(packError)
}

// 删除课程
export const deleteCourse: (params: {
    courseId: number
}) => ResType<{ courseId: number }> = (params) => {
    return _axios({
        method: "DELETE",
        url: "/web/course",
        data: params
    })
        .then(packEmptyData)
        .catch(packError)
}

// 获取创建的课程
export const getCoursesCreated: (params: {
    pageCurrent: number,
    pageSize: number
}) => ResType<ListRes<CourseType>> = async (params) => {
    return _axios.get(`/web/course/setup?pageCurrent=${params.pageCurrent}&pageSize=${params.pageSize}`)
        .then(res => packPageRes(res, packCourse))
        .catch(packError)
}