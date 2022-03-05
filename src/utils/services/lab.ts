import _axios from "./axios";
import { ResType, ListRes } from "./type";
import { fmatDate, fmatTime } from '../helper';
import { packError, packEmptyData, packPageRes } from "./pack";
import { labType } from '@/type';

const packLab = (lab: labRes) => ({
    labId: lab.lab_id || lab.id,
    courseId: lab.course_id,
    courseName: lab.course_name,
    title: lab.title,
    content: lab.content,
    createdAt: fmatTime(lab.created_at),
    updateAt: fmatTime(lab.update_at),
    deadLine: fmatTime(lab.dead_line),
    isFinish: lab.is_finish,
    comment: lab.comment,
    score: lab.score,
    attachmentUrl: lab.attachment_url,
    reportUrl: lab.report_url
})
interface createLabReq {
    courseId: number,
    title: string,
    content: string,
    attachmentUrl: string,
    deadLine: string
}

export const createLab: (params: createLabReq) => ResType<''> = (params) => {
    return _axios({
        method: "POST",
        url: "/web/lab",
        data: params,
    })
        .then(packEmptyData)
        .catch(packError)
}

interface editLabReq {
    labId: number,
    title: string,
    content: string,
    attachmentUrl: string,
    deadLine: string
}

export const editLab: (params: editLabReq) => ResType<''> = (params) => {
    return _axios({
        method: "PUT",
        url: "/web/lab",
        data: params,
    })
        .then(packEmptyData)
        .catch(packError)
}

export const deleteLab: (labId: number) => ResType<''> = (labId) => {
    return _axios({
        method: "DELETE",
        url: '/web/lab/',
        data: {
            lab: labId
        }
    })
        .then(packEmptyData)
        .catch(packError)
}

interface labRes {
    lab_id: number;
    id: number;
    course_id: number;
    course_name?: string;
    title: string;
    content: string;
    created_at: string;
    update_at: string;
    dead_line: string;
    score?: number;
    is_finish?: boolean;
    comment?: string;
    attachment_url: string;
    report_url?: string;
}

export const getLabById: (labId: number) => ResType<labType> = (labId) => {
    return _axios({
        method: "GET",
        url: `/web/lab/${labId}`,
    }).then((res) => {
        return {
            code: 0,
            data: packLab(res.data.data)
        }
    }).catch(packError)
}

interface getLabReq {
    pageCurrent: number,
    pageSize: number,
    courseId: number
}

export const getLabs: (params: getLabReq) => ResType<ListRes<labType>> = (params) => {
    return _axios({
        method: "GET",
        url: "/web/lab",
        params,
    })
        .then(res => packPageRes(res, packLab)) //WAITFIX 返回结构不同于其他，res.data / res.data.data
        .catch(packError)
}

export const getStuCourseLabs: (params: getLabReq) => ResType<ListRes<labType>> = (params) => {
    return _axios({
        method: "GET",
        url: '/web/lab/details',
        params,
    })
        .then(res => packPageRes(res, packLab)) //WAITFIX 返回结构不同于其他，res.data / res.data.data
        .catch(packError)
}

export const getMyLabs: (params: {
    pageCurrent: number,
    pageSize: number,
}) => ResType<ListRes<labType>> = (params) => {
    return _axios({
        method: "GET",
        url: "/web/lab/student",
        params,
    })
        .then(res => packPageRes(res, packLab))
        .catch(packError)
}