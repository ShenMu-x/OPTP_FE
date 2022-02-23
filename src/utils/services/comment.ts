import _axios from "./axios";
import { ResType, ListRes } from './type';
import { commentType } from '@/type';

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
export const fetchComment: (params: commentReq) => ResType<ListRes<any>> = (params) => {
    return _axios({
        method: "GET",
        url: `/web/comment/course`,
        params,
    })
        .then(value => {
            console.log(value);
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