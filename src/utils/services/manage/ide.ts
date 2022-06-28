import _axios from "../axios";
import { ResType, ListRes } from "../type";
import { packError, packEmptyData, packPageRes } from "../pack";
import { fmatTime } from "@/utils/helper";
export interface IdeType {
    containerId: string,
    labId: number,
    labName: string,
    courseId: number,
    courseName: string,
    studentId: number,
    studentName: string,
    createdAt: string,
    size: string,//IDE占用磁盘空间
    teacherInfo?: {
        teacherId: number
        teacherName: string
    },//教师打开ide才有本字段
    labIsEnd: boolean,
    port: number //IDE端口号
}
const packIde = (info: { container_id: any; lab_id: any; lab_name: any; course_id: any; course_name: any; student_id: any; student_name: any; created_at: string; size: any; teacher_info: { teacher_id: any; teacher_name: any; }; lab_is_end: any; port: any; cpu_perc: any; mem_usage: any; }) => ({
    containerId: info.container_id,
    labId: info.lab_id,
    labName: info.lab_name,
    courseId: info.course_id,
    courseName: info.course_name,
    studentId: info.student_id,
    studentName: info.student_name,
    createdAt: fmatTime(info.created_at),
    size: info.size,//IDE占用磁盘空间
    teacherInfo: info.teacher_info ? {
        teacherId: info.teacher_info.teacher_id,
        teacherName: info.teacher_info.teacher_name
    } : null,
    labIsEnd: info.lab_is_end,
    port: info.port, //IDE端口号
    cpuPerc: info.cpu_perc, // CPU占用率
    memUsage: info.mem_usage // 内存使用情况
})
export enum ideOrderEnum {
    CreatedAt,
    MemoryUsage,
    CpuPerc,
    Size
}
// 获取系统课程列表
export const getAllIdeContainer: (params: {
    pageCurrent: number,
    pageSize: number,
    order: ideOrderEnum,
    isReverse: boolean
}) => ResType<ListRes<IdeType>> = (params) => {
    return _axios({
        method: "GET",
        url: "/admin/ide",
        params,
    })
        .then(res => packPageRes(res, packIde))
        .catch(packError)
}

export const closeIDE: (containerId: number) => ResType<any> = (containerId) => {
    return _axios({
        method: "POST",
        url: "/admin/ide/quit",
        data: { containerID: containerId }
    })
        .then(packEmptyData)
        .catch(packError)
}