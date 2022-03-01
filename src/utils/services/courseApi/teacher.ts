import _axios from '../axios';
import { ResType, ListRes } from '../type';
import { CourseType } from '@/type';
import { fmatDate, fmatTime } from '../../helper';
import { packCourse, packRecords, packStud } from './pack';

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
        .then(value => {
            console.log(value.data);
            return { code: 0 }
        })
        .catch(err => {
            return {
                code: err.response?.data?.code ?? -1,
                error: {
                    message: err.response?.data?.message,
                }
            }
        })
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
        .then(value => {
            return {
                code: 0
            }
        })
        .catch(err => {
            return {
                code: err.response?.data?.code ?? -1,
                error: {
                    message: err.response?.data?.message,
                }
            }
        })
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
        .then(value => {
            return { code: 0 }
        })
        .catch(err => {
            return {
                code: err.response?.data?.code ?? -1,
                error: {
                    message: err.response?.data?.message ?? '',
                }
            }
        })
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
    }).then(res => {
        return {
            code: 0,
            data: {
                records: res.data.data.records?.map((item: any) => packStud(item)) || [],
                pageInfo: res.data.data?.page_info
            }
        }
    }).catch(err => {
        return {
            code: -1,
        }
    })
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
    }).then(res => {
        return {
            code: 0,
            data: {
                records: res.data.data.records.map((item: any) => packStud(item)) || [],
                pageInfo: res.data.data?.page_info
            }
        }
    }).catch(err => {
        console.log(err.response);
        return {
            code: -1
        }
    })
}
