import _axios from '../axios';
import { ResType, ListRes } from '../type';
import { fmatTime } from '../../helper'
import { packError, packEmptyData } from "../pack";
import { packAttend } from './pack'

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
    }).catch(packError)
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
    courseId: number
}

export const getMyAttend = (params: MyAttendReq) => {
    return _axios({
        method: "GET",
        url: "/web/checkin/record/user",
        params,
    })
        .then(res => {
            return {
                code: 0,
                data: {
                    records: res.data?.data?.records?.map((item: any) => packAttend(item)),
                    pageInfo: res.data?.data?.page_info
                }
            }
        })
        .catch(packError)
}