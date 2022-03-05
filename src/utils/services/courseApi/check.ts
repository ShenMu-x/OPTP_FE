import _axios from '../axios';
import { ResType, ListRes } from '../type';
import { fmatTime } from '../../helper'
import { packError, packEmptyData, packPageRes } from "../pack";

export const packAttendInfo = (item: {
    course_id?: number,
    total?: number,
    actual?: number,
    checkin_record_id: number;
    created_at: string;
    is_checkin?: boolean;
    name: string;
}) => ({
    courseId: item.course_id,
    actual: item.actual,
    total: item.total,
    checkinRecordId: item.checkin_record_id,
    createAt: fmatTime(item.created_at),
    isCheckIn: item.is_checkin,
    name: item.name
})

export const packStudAttend = (item: {
    course_name: string;
    secret_key: string;
    checkin_record_id: number;
    created_at: string;
    dead_line: string;
    is_finish: boolean;
    name: string;
}) => ({
    checkinRecordId: item.checkin_record_id,
    courseName: item.course_name,
    name: item.name,
    secretKey: item.secret_key,
    createAt: fmatTime(item.created_at),
    deadLine: fmatTime(item.dead_line),
    is_finish: item.is_finish,
})

export const checkAttend: (params: {
    pageCurrent: number,
    pageSize: number,
    courseId: number
}) => ResType<ListRes<any>> = (params) => {
    return _axios({
        method: "get",
        url: "/web/checkin/records",
        params,
    })
        .then(res => packPageRes(res, packAttendInfo))
        .catch(packError)
}
interface createAttendReq {
    secretKey: string,
    courseId: number,
    duration: number,
    name: string,
}

export const createAttend = (params: createAttendReq) => {
    return _axios({
        method: "POST",
        url: "/web/checkin/start",
        data: params,
    })
        .then(packEmptyData)
        .catch(packError)
}

interface MyAttendReq {
    pageCurrent: number,
    pageSize: number,
}

export const getMyAttend = (params: MyAttendReq) => {
    return _axios({
        method: "GET",
        url: "/web/checkin/self",
        params,
    })
        .then(res => packPageRes(res, packStudAttend))
        .catch(packError)
}

export const reqAttendStart = () => {
    return _axios({
        method: "GET",
        url: "/web/checkin/recent",
    })
        .then(res => packStudAttend(res.data.data))
        .catch(packError)
}