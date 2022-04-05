import _axios from "../axios";
import { ResType, ListRes } from '../type';
import { fmatTime } from '../../helper';
import { packError, packEmptyData, packPageRes } from "../pack";

const pack = (item: any) => ({
    courseCommentId: item.course_comment_id,
    courseId: item.course_id,
    commentText: item.comment_text,
    pid: item.pid,
    userId: item.user_id,
    userAvatarUrl: item.user_avatar_url,
    username: item.username,
    replyUserId: item.reply_user_id,
    createdAt: fmatTime(item.created_at),
    updatedAt: fmatTime(item.updated_at),
    replyUsername: item?.reply_username
})
const packCommentItem = (item: any) => ({
    comment: pack(item.comment),
    replyComments: item.reply_comments?.map?.((reply: any) => pack(reply)) || []
})
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
        .then(res => packPageRes(res, packCommentItem))
        .catch(packError)
}

export const publishCourseComment: (params: {
    courseId: number,
    commentText: string,
    replyId: number,
}) => ResType<ListRes<any>> = (params) => {
    return _axios({
        method: "POST",
        url: `/web/comment/course`,
        data: params,
    })
        .then(packEmptyData)
        .catch(packError)
}

export const deleteCourseComment: (params: { commentId: number }) => ResType<any> = (params) => {
    return _axios({
        method: "DELETE",
        url: `/web/comment/course`,
        data: params,
    })
        .then(packEmptyData)
        .catch(packError)
}
