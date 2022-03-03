import _axios from "./axios";
import { ResType, ListRes } from './type';
import { commentType } from '@/type';
import { packError } from "./pack";

const packComment = (comment: any) => {
    return {
        commentId: 1
    }
}

const packRecords = (list: Array<any>) => {
    return list.map(cmt => packComment(cmt));
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
        .then(value => {
            return {
                code: 0,
                data: {
                    records: packRecords(value.data.data.records),
                    pageInfo: value.data.data.page_info
                }
            }
        })
        .catch(packError)
}