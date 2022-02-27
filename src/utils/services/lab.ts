import _axios from "./axios";
import { ResType, ListRes } from "./type";
import { fmatDate } from '../helper';
import { labType } from '@/type';

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
    return _axios({
        method: "PUT",
        url: "/web/lab",
        data: params,
    }).then((res) => {
        return { code: 0 }
    }).catch(err => {
        return {
            code: err.response.data.code,
            error: {
                message: err.response.data.message,
            }
        }
    })
}

export const deleteLab: (labId: number) => ResType<''> = (labId) => {
    return _axios({
        method: "DELETE",
        url: '/web/lab/',
        data: {
            lab: labId
        }
    }).then(res => {
        return { code: 0 }
    }).catch(err => {
        return {
            code: err.response.data.code,
            error: {
                message: err.response.data.message,
            }
        }
    })
}

interface labRes {
    lab_id: number;
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

const packLab = (lab: labRes) => {
    return {
        labId: lab.lab_id,
        courseId: lab.course_id,
        courseName: lab.course_name,
        title: lab.title,
        content: lab.content,
        createdAt: fmatDate(lab.created_at),
        updateAt: fmatDate(lab.update_at),
        deadLine: fmatDate(lab.dead_line),
        isFinish: lab.is_finish,
        comment: lab.comment,
        score: lab.score,
        attachmentUrl: lab.attachment_url,
        reportUrl: lab.report_url
    }
}

const packRecords = (records: labRes[]) => {
    return records.map((lab: labRes) => packLab(lab));
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
    }).catch(err => {
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

export const getLabs: (params: getLabReq) => ResType<ListRes<labType>> = (params) => {
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

export const getMyLabs: (params: {
    pageCurrent: number,
    pageSize: number,
}) => ResType<ListRes<labType>> = (params) => {
    return _axios({
        method: "GET",
        url: "/web/lab/student",
        params,
    })
        .then(value => {
            return {
                code: 0,
                data: {
                    records: value.data.data.records.map((lab: any) => {
                        return {
                            id: lab.lab_id,
                            courseId: lab.course_id,
                            courseName: lab.course_name,
                            title: lab.title,
                            content: lab.content,
                            attachmentUrl: lab.attachment_url,
                            deadLine: fmatDate(lab.dead_line),
                            createAt: fmatDate(lab.created_at),
                            updateAt: fmatDate(lab.updated_at)
                        }
                    }),
                    pageInfo: value.data.data.page_info
                }
            }
        })
        .catch(err => {
            console.log('??', err);
            return {
                code: err.response?.data?.code,
                error: {
                    message: err.response?.data?.message,
                }
            }
        })
}

export const getLabDetail: (

) => ResType<ListRes<labType>> = () => {
    return _axios({
        method: "GET",
        url: `/web/lab/details`,
        params: {
            courseId: 2,
            pageCurrent: 1,
            pageSize: 20
        }
    })
        .then(value => {
            return {
                code: 0,

            }
        })
        .catch(err => {
            return {
                code: err.response?.data?.code,
                error: {
                    message: err.response?.data?.message,
                }
            }
        })
}