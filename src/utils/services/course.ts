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

