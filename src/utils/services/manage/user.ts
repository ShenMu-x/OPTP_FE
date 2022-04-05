import _axios from "../axios";
import { ResType } from "../type";
import { packError, packEmptyData } from "../pack";
import { exportCsv } from "../exportCsv";
// GET /admin/user/import
// csv导入学生名单
// name="csv"

// 获取系统账户列表
export const getAllAccoutInfo: (params: {
    pageCurrent: number,
    pageSize: number
}) => ResType<''> = (params) => {
    return _axios({
        method: "GET",
        url: "/admin/user",
        params,
    })
        .then(packEmptyData)
        .catch(packError)
}
// 新增系统用户
interface addAccountReq {
    email: string,
    number: string,
    role: 0 | 1,
    name: string
}
export const addAccount: (data: addAccountReq) => ResType<any> = (data) => {
    return _axios({
        method: "POST",
        url: "/admin/distribute",
        data,
    })
        .then(packEmptyData)
        .catch(packError)
}
// 修改用户信息
interface editAccountReq {
    user_id: number,
    email: string,
    number: string,
    name: string
    major: string,
    organization: string,
    avatar: string,
    gender: 0 | 1;
}
export const editAccountInfo: (data: editAccountReq) => ResType<any> = (data) => {
    return _axios({
        method: "POST",
        url: "/admin/amend",
        data,
    })
        .then(packEmptyData)
        .catch(packError)
}
export const getStudentCsvTemplate = () => {
    return exportCsv('/admin/user/export/template');
}