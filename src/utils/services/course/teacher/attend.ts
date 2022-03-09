import _axios from '../../axios';
import { ResType, ListRes } from '../../type';
import { fmatTime } from '../../../helper'
import { packError, packEmptyData, packPageRes } from "../../pack";

export type AttendCourse = {
    courseId: number,
    actual: number, // 实际签到人数
    total: number, // 预期签到人数
    checkinRecordId: number,
    createAt: string,
    isCheckIn: boolean,
    name: string
}

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

// 获取课程签到记录
export const getCourseAttendRecords: (params: {
    pageCurrent: number,
    pageSize: number,
    courseId: number
}) => ResType<ListRes<AttendCourse>> = (params) => {
    return _axios({
        method: "get",
        url: "/web/checkin/records",
        params,
    })
        .then(res => packPageRes(res, packAttendInfo))
        .catch(packError)
}

// 创建签到
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