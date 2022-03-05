import _axios from '../axios';
import { ResType, ListRes } from '../type';
import { CourseType } from '@/type';
import { fmatDate, fmatTime } from '../../helper';
import { packCourse } from './pack';
import { packError, packEmptyData, packPageRes } from "../pack";

export const packStud = (item: any) => ({
    userId: item.user_id,
    email: item.email,
    num: item.num,
    realName: item.real_name,
    avatarUrl: item.avatar_url,
    gender: item.gender,
    major: item.major,
    organization: item.organization
})


// 创建课程
interface createCourseReq {
    courseDes: string,
    secretkey: string,
    courseName: string,
    picUrl: string,
    language: number,
}
export const createCourse: (params: createCourseReq) => ResType<any> = (params) => {
    return _axios({
        method: "POST",
        url: "/web/course",
        data: params,
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
}
export const editCourse: (params: editCourseReq) => ResType<any> = (params) => {
    return _axios({
        method: "PUT",
        url: "/web/course",
        data: params,
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
    await new Promise(res => setTimeout(() => {
        res(1);
    }, 2000))
    return _axios.get(`/web/course/setup?pageCurrent=${params.pageCurrent}&pageSize=${params.pageSize}`)
        .then(res => packPageRes(res, packCourse))
        .catch(packError)
}

// 获取待认证学生
export const getVerifyStuds: (params: {
    courseId: number,
    pageSize: number,
    pageCurrent: number
}) => ResType<any> = (params) => {
    return _axios({
        method: 'GET',
        url: `/web/course/student/examine/${params.courseId}`,
        params: {
            pageSize: params.pageSize,
            pageCurrent: params.pageCurrent
        }
    })
        .then(res => packPageRes(res, packStud))
        .catch(packError)
}

// 获取课程学生
export const getStudents: (params: {
    courseId: number,
    pageSize: number,
    pageCurrent: number
}) => ResType<any> = (params) => {
    return _axios({
        method: 'GET',
        url: `/web/course/student/${params.courseId}`,
        params: {
            pageSize: params.pageSize,
            pageCurrent: params.pageCurrent
        }
    })
        .then(res => packPageRes(res, packStud))
        .catch(packError)
}
