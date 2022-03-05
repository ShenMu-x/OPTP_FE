import _axios from "./axios";
import { ResType, ListRes } from './type';
import { commentType } from '@/type';
import { packError, packPageRes } from "./pack";
// WAITFIX
const packComment = (comment: any) => {
    return {
        commentId: 1
    }
}

interface commentReq {
    pageCurrent: number,
    pageSize: number,
    courseId: number
}
export const fetchCourseComment: (params: commentReq) => ResType<ListRes<any>> = (params) => {
    return _axios({
        method: "GET",
        url: `/web/comment/course`,
        params,
    })
        .then(res => packPageRes(res, packComment))
        .catch(packError)
}