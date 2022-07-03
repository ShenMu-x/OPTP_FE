import _axios from "../axios";
import { ResType, ListRes } from "../type";
import { packError, packEmptyData, packPageRes } from "../pack";
import { fmatTime } from "@/utils/helper";
export interface manageCourseType {
    courseId: number,
    name: string,
    description: string,
    language: number,
    secretKey: string,
    picUrl: string,
    isClosed: boolean,
    createdAt: string,
    updatedAt: string,
    needAudit: boolean
}
const packCourse = (info: { course_id: any; name: any; description: any; language: any; secret_key: any; pic_url: any; is_close: any; created_at: any; updated_at: any; need_audit: any; }) => ({
    courseId: info.course_id,
    name: info.name,
    description: info.description,
    language: info.language,
    secretKey: info.secret_key,
    needAudit: info.need_audit,
    picUrl: info.pic_url,
    isClosed: info.is_close,
    createdAt: fmatTime(info.created_at),
    updatedAt: fmatTime(info.updated_at),
})

// 获取系统课程列表
export const getAllCourse: (params: {
    pageCurrent: number,
    pageSize: number
}) => ResType<ListRes<manageCourseType>> = (params) => {
    return _axios({
        method: "GET",
        url: "/admin/course",
        params,
    })
        .then(res => packPageRes(res, packCourse))
        .catch(packError)
}
// 修改课程信息
interface editCourseReq {
    course_id: number,
    name: string
    description: string,
    secret_key: string,
    pic_url: string,
    is_closed: boolean;
    need_aduit: boolean;
}
export const editCourseInfo: (data: editCourseReq) => ResType<any> = (data) => {
    return _axios({
        method: "POST",
        url: "/admin/course/amend",
        data,
    })
        .then(packEmptyData)
        .catch(packError)
}