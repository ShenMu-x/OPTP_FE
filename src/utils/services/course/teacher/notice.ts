import _axios from '../../axios';
import { ResType } from '../../type';
import { packError, packEmptyData } from "../../pack";

export const createNotice: (params: {
    courseId: number,
    title: string,
    content: string,
    attachmentUrl: String
}) => ResType<''> = (params) => {
    return _axios({
        method: "POST",
        url: "/web/course/resource",
        data: params,
    })
        .then(packEmptyData)
        .catch(packError)
}

export const deleteNotice: (courseResourceId: number) => ResType<''> = (courseResourceId) => {
    return _axios({
        method: "DELETE",
        url: `/web/course/resource/${courseResourceId}`,
        data: { courseResourceId }
    })
        .then(packEmptyData)
        .catch(packError)
}
export const editNotice: (params: {
    resourceId: number,
    title: string,
    content: string,
    attachmentUrl: String
}) => ResType<''> = (params) => {
    return _axios({
        method: "PUT",
        url: "/web/course/resource",
        data: params,
    })
        .then(packEmptyData)
        .catch(packError)
}