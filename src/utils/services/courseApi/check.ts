import _axios from '../axios';
import { ResType, ListRes } from '../type';
import { fmatTime } from '../../helper'

const packAttend = (item: {
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

export const checkAttend: (params: {
    pageCurrent: number,
    pageSize: number,
    courseId: number
}) => ResType<ListRes<any>> = (params) => {
    return _axios({
        method: "get",
        url: "/web/checkin/records",
        params,
    }).then(res => {
        return {
            code: 0,
            data: {
                records: res.data.data.records?.map((item: any) => packAttend(item)) || [],
                pageInfo: res.data.data?.page_info
            }
        }
    }).catch(err => {
        return { code: -1 }
    })
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
    }).then(res => {
        return { code: 0 }
    }).catch(err => {
        return { code: -1 }
    })
}

interface MyAttendReq {
    pageCurrent: number,
    pageSize: number,
    courseId: number
}

export const getMyAttend = (params: MyAttendReq) => {
    return _axios({
        method: "GET",
        url: "/web/checkin/record/user",
        params,
    }).then(res => {
        console.log('???', res.data)
        return {
            code: 0,
            data: {
                records: res.data?.data?.records?.map((item: any) => packAttend(item)),
                pageInfo: res.data?.data?.page_info
            }
        }
    }).catch(err => {
        return { code: -1 }
    })
}