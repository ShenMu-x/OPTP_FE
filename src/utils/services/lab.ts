import _axios from "./axios";
import { ResType, ListRes } from "./type";
import { fmatDate } from '../helper';
import { labType } from '@/type';

interface labRes {
    id: number;
    course_id: number;
    title: string;
    content: string;
    attachment_url: string;
    dead_line: string;
    created_at: string;
}

const packLab = (lab: labRes) => {
    return {
        id: lab.id,
        courseId: lab.course_id,
        title: lab.title,
        content: lab.content,
        attachmentUrl: lab.attachment_url,
        deadLine: fmatDate(lab.dead_line),
        createdAt: fmatDate(lab.created_at)
    }
}

const packRecords = (records: labRes[]) => {
    return records.map((lab: labRes) => packLab(lab));
}

interface createLabReq {
    courseId: number,
    title: string,
    content: string,
    attachmentUrl: string,
    deadLine: string
}

export const createLab: (params: createLabReq) => ResType<''> = (params) => {
    console.log('create', params)
    return _axios({
        method: "POST",
        url: "/web/lab",
        data: params,
    }).then((res) => {
        console.log(res);
        return { code: 0 }
    }).catch(err => {
        console.log(err)
        return {
            code: err.response.data.code,
            error: {
                message: err.response.data.message,
            }
        }
    })
}

interface editLabReq {
    labId: number,
    title: string,
    content: string,
    attachmentUrl: string,
    deadLine: string
}

export const editLab: (params: editLabReq) => ResType<''> = (params) => {
    console.log('edit', params)
    return _axios({
        method: "PUT",
        url: "/web/lab",
        data: params,
    }).then((res) => {
        console.log(res);
        return { code: 0 }
    }).catch(err => {
        console.log(err)
        return {
            code: err.response.data.code,
            error: {
                message: err.response.data.message,
            }
        }
    })
}

export const getLabById: (labId: number) => ResType<labType> = (labId) => {
    return _axios({
        method: "GET",
        url: `/web/lab/${labId}`,
    }).then((res) => {
        console.log(res);
        return {
            code: 0,
            data: {
                id: res.data.data.lab_id,
                courseId: res.data.data.course_id,
                title: res.data.data.title,
                content: res.data.data.content,
                attachmentUrl: res.data.data.attachment_url,
                deadLine: fmatDate(res.data.data.dead_line),
                createdAt: fmatDate(res.data.data.created_at),
                updatedAt: fmatDate(res.data.data.updated_at)
            }
        }
    }).catch(err => {
        console.log(err)
        return {
            code: err.response.data.code,
            error: {
                message: err.response.data.message,
            }
        }
    })
}

interface getLabReq {
    pageCurrent: number,
    pageSize: number,
    courseId: number
}

export const getLabs: (params: getLabReq) => ResType<ListRes<any>> = (params) => {
    return _axios({
        method: "GET",
        url: "/web/lab",
        params,
    }).then(value => {
        return {
            code: 0,
            data: {
                records: packRecords(value.data.records),
                pageInfo: value.data.page_info
            }
        }
    })
        .catch(err => {
            return {
                code: err.response.code,
                error: {
                    message: err.response.message,
                }
            }
        })
}