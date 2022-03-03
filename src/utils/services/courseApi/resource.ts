import _axios from '../axios';
import { ResType } from '../type';
import { fmatDate, fmatTime } from '../../helper';
import { packError, packEmptyData } from "../pack";

export const getCourseResource: (params: {
    courseId: number,
    pageSize: number,
    pageCurrent: number
}) => ResType<any> = (params) => {
    return _axios({
        method: "GET",
        url: "/web/course/resource",
        params,
    })
        .then(res => {
            return {
                code: 0,
                data: {
                    records: res.data.data.records?.map((item: any) => ({
                        resourceId: item.ID,
                        courseId: item.CourseID,
                        title: item.Title,
                        content: item.Content,
                        attachmentUrl: item.AttachMentURL,
                        createAt: fmatTime(item.created_at),
                        updateAt: fmatTime(item.UpdatedAt)
                    })) || [],
                    pageInfo: res.data.data?.page_info
                }
            }
        })
        .catch(packError)
}

export const getResourceById: (id: number) => ResType<any> = (id) => {
    return _axios({
        method: "GET",
        url: `/web/course/resource/${id}`,
        params: {
            // 暂传
            pageSize: 20,
            pageCurrent: 1
        }
    })
        .then(res => {
            return {
                code: 0,
                data: {
                    resourceId: res.data.data.course_recourse_id,
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