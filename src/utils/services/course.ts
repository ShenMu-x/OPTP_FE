import _axios from './axios';
import { ResType } from './type';

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

interface ListRes {
    records: Array<any>,
    pageInfo: {
        total: number,
        size: number,
        current: number,
        pages: number
    }
}

export const getCoursesAll: (params: {
    pageCurrent: number,
    pageSize: number
}) => ResType<ListRes> = (params) => {
    return _axios.get(`/web/course?pageCurrent=${params.pageCurrent}&pageSize=${params.pageSize}`)
        .then(value => {
            return {
                code: 0,
                data: {
                    records: value.data.data.records,
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
}) => ResType<ListRes> = (params) => {
    return _axios.get(`/web/course/study?pageCurrent=${params.pageCurrent}&pageSize=${params.pageSize}`)
        .then(value => {
            return {
                code: 0,
                data: {
                    records: value.data.data.records,
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
}) => ResType<ListRes> = (params) => {
    return _axios.get(`/web/course/setup?pageCurrent=${params.pageCurrent}&pageSize=${params.pageSize}`)
        .then(value => {
            console.log('success')
            return {
                code: 0,
                data: {
                    records: value.data.data?.records ?? [],
                    pageInfo: value.data.data?.page_info ?? {}
                }
            }
        })
        .catch(err => {
            console.log(err);
            return {
                code: -1,
                error: {
                    message: '',
                }
            }
        })
}