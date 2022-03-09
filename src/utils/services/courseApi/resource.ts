import _axios from '../axios';
import { ResType } from '../type';
import { fmatDate, fmatTime } from '../../helper';
import { packError, packEmptyData, packPageRes } from "../pack";

const packResource = (item: any) => ({
    resourceId: item.ID,
    courseId: item.CourseID,
    title: item.Title,
    content: item.Content,
    attachmentUrl: item.AttachMentURL,
    createAt: fmatTime(item.created_at),
    updateAt: fmatTime(item.UpdatedAt)
})

export const getCourseNotice: (params: {
    courseId: number,
    pageSize: number,
    pageCurrent: number
}) => ResType<any> = (params) => {
    return _axios({
        method: "GET",
        url: "/web/course/resource",
        params,
    })
        .then(res => packPageRes(res, packResource))
        .catch(packError)
}

export const getNoticeById: (resourceId: number) => ResType<any> = (resourceId) => {
    return _axios({
        method: "GET",
        url: `/web/course/resource/${resourceId}`,
        params: {
            pageSize: 20,
            pageCurrent: 1
        }
    })
        .then(res => {
            return {
                code: 0,
                data: {
                    courseResourceId: res.data.data.course_recourse_id,
                    title: res.data.data.title,
                    content: res.data.data.content,
                    attachmentUrl: res.data.data.attachment_url,
                    createAt: fmatTime(res.data.data.created_at),
                    updateAt: fmatTime(res.data.data.UpdatedAt)
                }
            }
        })
        .catch(packError)
}

export const addResource: (params: {
    courseId: number,
    title: string,
    content: string,
    attachmentUrl: String
}) => ResType<''> = (params) => {
    console.log('params', params);
    return _axios({
        method: "POST",
        url: "/web/course/resource",
        data: params,
    })
        .then(packEmptyData)
        .catch(packError)
}