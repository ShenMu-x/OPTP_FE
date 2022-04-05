import _axios from '../../axios';
import { ResType, ListRes } from '../../type';
import { fmatTime } from '../../../helper'
import { packError, packEmptyData, packPageRes } from "../../pack";
import { exportCsv } from '../../exportCsv';

export type AttendCourse = {
    checkinRecordId: number,
    courseId: number,
    actual: number, // 实际签到人数
    total: number, // 预期签到人数
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
    checkinRecordId: item.checkin_record_id,
    courseId: item.course_id,
    actual: item.actual,
    total: item.total,
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
// 删除签到 
export const deleteAttend = (id: number) => {
    return _axios({
        method: "DELETE",
        url: "/web/checkin/record",
        params: { checkInRecordId: id },
    })
        .then(packEmptyData)
        .catch(packError)
}
// 导出签到表
export const exportAttend: (courseId: number) => ResType<{ csvData: any }> = (courseId) => {
    return exportCsv(`/web/checkin/export/${courseId}`);
}