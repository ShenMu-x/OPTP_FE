import _axios from './axios';

interface createCourseReq {
    courseDes: string,
    secretkey: string,
    courseName: string,
    picUrl: string,
    language: number,
}

export const createCourse: (params: createCourseReq) => Promise<any> = (params) => {
    return _axios({
        method: "POST",
        url: "/web/course",
        data: params,
    })
}

export const editCourse: (params: createCourseReq) => Promise<any> = (params) => {
    return _axios({
        method: "PUT",
        url: "/web/course",
        data: params,
    })
}

type getCourseLsRes = {
    code: number,
    data: {
        records: Array<any>,
        pageInfo: {
            total: number,
            size: number,
            current: number,
            pages: number
        }
    }

}

export const getCourseList: (params: {
    pageCurrent: number,
    pageSize: number
}) => Promise<getCourseLsRes> = (params) => {
    return _axios.get('/web/course?' + `pageCurrent=${params.pageCurrent}&pageSize=${params.pageSize}`)
        .then(value => {

            console.log('getCourse', value.data);
            return {
                code: value.data.code,
                data: {
                    records: value.data.records,
                    pageInfo: value.data.page_info
                }
            }
        })
        .catch(err => {
            return {
                code: -1,
                data: {
                    records: [],
                    pageInfo: {
                        total: 0,
                        size: 0,
                        current: 0,
                        pages: 0
                    }
                }
            }
        })
}
