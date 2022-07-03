import _axios from "../axios";
import { ResType, ListRes } from "../type";
import { packError, packErrorWrap, packEmptyData, packPageRes } from "../pack";
import { packAccountInfo } from "../packCommon";
import { exportCsv } from "../exportCsv";
export interface accountType {
    userId: number,
    email: string,
    num: string,
    realName: string,
    avatarUrl: string,
    gender: number,
    major: string,
    organization: string
}

// 获取系统账户列表
export const getAllAccoutInfo: (params: {
    pageCurrent: number,
    pageSize: number
}) => ResType<ListRes<accountType>> = (params) => {
    return _axios({
        method: "GET",
        url: "/admin/user",
        params,
    })
        .then(res => packPageRes(res, packAccountInfo))
        .catch(packError)
}
// 新增系统用户
interface addAccountReq {
    email: string,
    name: string,
    number: string,
    role: 0 | 1,
}
export const addAccount: (data: addAccountReq) => ResType<any> = (data) => {
    return _axios({
        method: "POST",
        url: "/admin/user/distribute",
        data,
    })
        .then(packEmptyData)
        .catch(err => packErrorWrap(err, [
            [-19999, '填写邮箱或学号已被注册']
        ]))
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
    college: string;
    grade: number;
}
export const editAccountInfo: (data: editAccountReq) => ResType<any> = (data) => {
    return _axios({
        method: "POST",
        url: "/admin/user/amend",
        data,
    })
        .then(packEmptyData)
        .catch(packError)
}
export const getStudentCsvTemplate = () => {
    return exportCsv('/admin/user/export/template');
}

// 修改用户登录密码
export const editAccountPassword: (data: {
    user_id: number,
    password: string
}) => ResType<any> = (data) => {
    return _axios({
        method: "POST",
        url: "/admin/user/password",
        data,
    })
        .then(packEmptyData)
        .catch(packError)
}