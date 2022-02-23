import _axios from './axios';
import { ResType, ListRes } from './type';
import { CourseType } from '@/type';
import { fmatDate } from '../helper';

const packCourse = (course: any): CourseType => {
    return {
        courseId: course.course_id,
        teacherId: course.teacher_id,
        teacherName: course.teacher_name,
        courseName: course.course_name,
        courseDes: course.course_des,
        picUrl: course.pic_url,
        secretKey: course.secret_key,
        isClose: course.is_close,
        language: course.language,
        createdAt: fmatDate(course.created_at),
        updatedAt: fmatDate(course.updated_at)
    }
}

const packRecords = (list: Array<any>) => {
    return list.map?.(course => packCourse(course));
}

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
        .then(value => {
            console.log(value.data);
            return { code: 0 }
        })
        .catch(err => {
            console.log(err.response);
            return { code: -1 }
        })
}

export const editCourse: (params: createCourseReq) => ResType<any> = (params) => {
    return _axios({
        method: "PUT",
        url: "/web/course",
        data: params,
    })
        .then(value => {
            return {
                code: 0
            }
        })
        .catch(err => { return { code: -1 } })
}

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
        .catch(err => {
            return {
                code: err.response.data.code,
                error: {
                    message: err.response.data.message,
                }
            }
        })
}

export const getCoursesStudy: (params: {
    pageCurrent: number,
    pageSize: number
}) => ResType<ListRes<CourseType>> = (params) => {
    return _axios.get(`/web/course/study?pageCurrent=${params.pageCurrent}&pageSize=${params.pageSize}`)
        .then(value => {
            return {
                code: 0,
                data: {
                    records: packRecords(value.data.data.records),
                    pageInfo: value.data.data.page_info
                }
            }
        })
        .catch(err => {
            return {
                code: err.response.data.code,
                error: {
                    message: err.response.data.message,
                }
            }
        })
}

export const getCoursesCreated: (params: {
    pageCurrent: number,
    pageSize: number
}) => ResType<ListRes<CourseType>> = (params) => {
    return _axios.get(`/web/course/setup?pageCurrent=${params.pageCurrent}&pageSize=${params.pageSize}`)
        .then(value => {
            return {
                code: 0,
                data: {
                    records: packRecords(value.data.data.records),
                    pageInfo: value.data.data?.page_info
                }
            }
        })
        .catch(err => {
            return {
                code: err.response.data.code,
                error: {
                    message: err.response.data.message,
                }
            }
        })
}

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
        .catch(err => {
            return {
                code: err.response.data.code,
                error: {
                    message: err.response.data.message,
                }
            }
        })
}

export const attendCourse: (params: {
    courseId: number,
    secretKey: string,
}) => ResType<any> = (params) => {
    return _axios({
        method: "POST",
        url: "/web/course/attend",
        data: params
    })
        .then(value => {
            return { code: 0 }
        })
        .catch(err => {
            return { code: -1 }
        })
}