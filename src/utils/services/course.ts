import _axios from './axios';
import { ResType } from './type';

interface createCourseReq {
    courseDes: string,
    secretkey: string,
    courseName: string,
    picUrl: string,
    language: number,
}

// export const createCourse: (params: createCourseReq) => ResType<any> = (params) => {
//     return _axios({
//         method: "POST",
//         url: "/web/course",
//         data: params,
//     })
//         .then(value => {

//         })
//         .catch(err => { })
// }

// export const editCourse: (params: createCourseReq) => ResType<any> = (params) => {
//     return _axios({
//         method: "PUT",
//         url: "/web/course",
//         data: params,
//     })
//         .then(value => {

//         })
//         .catch(err => { })
// }

interface ListRes {
    records: Array<any>,
    pageInfo: {
        total: number,
        size: number,
        current: number,
        pages: number
    }
}

export const getCourseList: (params: {
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
