import _axios from '../../axios';
import { ResType } from '../../type';
import { packError, packEmptyData, packPageRes } from "../../pack";
import { exportCsv } from '../../exportCsv';

// 审核学生加入申请
export const checkJoinInApplication: (params: {
    courseId: number,
    stuIds: number[],
    isPermitted: boolean,
}) => ResType<any> = (params) => {
    return _axios({
        method: "POST",
        url: "/web/course/examine",
        data: params,
    })
        .then(packEmptyData)
        .catch(packError)
}

export const packStud = (item: any) => ({
    userId: item.user_id,
    email: item.email,
    num: item.num,
    realName: item.real_name,
    avatarUrl: item.avatar_url,
    gender: item.gender,
    major: item.major,
    organization: item.organization
})

// 获取申请加入的学生列表
export const getAskForAdmissionStudents: (params: {
    courseId: number,
    pageSize: number,
    pageCurrent: number
}) => ResType<any> = (params) => {
    return _axios({
        method: 'GET',
        url: `/web/course/student/examine/${params.courseId}`,
        params: {
            pageSize: params.pageSize,
            pageCurrent: params.pageCurrent
        }
    })
        .then(res => packPageRes(res, packStud))
        .catch(packError)
}

// 获取课程学生
export const getCourseStudents: (params: {
    courseId: number,
    pageSize: number,
    pageCurrent: number
}) => ResType<any> = (params) => {
    return _axios({
        method: 'GET',
        url: `/web/course/student/${params.courseId}`,
        params: {
            pageSize: params.pageSize,
            pageCurrent: params.pageCurrent
        }
    })
        .then(res => packPageRes(res, packStud))
        .catch(packError)
}

//获取学生模板
export const fetchImportMemberTemplate: () => ResType<{csvData: any}> = () => {
    return exportCsv(`/web/course/student/export/template`);
}