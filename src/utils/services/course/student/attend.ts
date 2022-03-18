import _axios from '../../axios';
import { ResType, ListRes } from '../../type';
import { fmatTime } from '../../../helper'
import { packEmptyData, packError, packPageRes } from "../../pack";

export type AttendType = {
    checkinRecordId: number,
    courseName: string,
    name: string,
    createAt: string,
    deadLine: string,
    isFinish: boolean,
}

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
    createAt: fmatTime(item.created_at),
    deadLine: fmatTime(item.dead_line),
    isFinish: item.is_finish,
})

interface MyAttendReq {
    pageCurrent: number,
    pageSize: number,
}
export const getMyAttendRecords: (params: MyAttendReq) => ResType<ListRes<AttendType>> = (params) => {
    return _axios({
        method: "GET",
        url: "/web/checkin/self",
        params,
    })
        .then(res => packPageRes(res, packStudAttend))
        .catch(packError)
}

export const getMyAttendRecordsInProgress: () => ResType<Array<AttendType>> = () => {
    return _axios({
        method: "GET",
        url: "/web/checkin/recent",
    })
        .then(res => {
            return {
                code: 0,
                data: res.data?.data?.map((item: any) => packStudAttend(item)) || [],
            }
        })
        .catch(packError)
}

// 学生签到 WAITFIX 参数有误
export const checkAttend: (params: { courseID: number }) => ResType<''> = (params) => {
    return _axios({
        method: 'POST',
        url: '/web/checkin/check',
        data: {
            courseId: params.courseID,
        }
    })
        .then(packEmptyData)
        .catch(packError)
}