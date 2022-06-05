import _axios from "../axios";
import { ResType } from '../type';
import { packErrorWrap, packEmptyData } from "../pack";
import { setTokens } from '../../helper';
interface RegisterReq {
    email: string;
    realName: string;
    num: string;
    gender: number;
    password: string;
    major: string;
    organization: string;
    verificationCode: string;
}
export const registerStudentAccount: (params: RegisterReq) => ResType<''> = (params) => {
    return _axios.post('/web/user/signup/stu', params)
        .then(packEmptyData)
        .catch(err => packErrorWrap(err, [
            [10002, '验证码过期或有误']
        ]));
}

export const registerTeacherAccount: (params: RegisterReq) => ResType<''> = (params) => {
    return _axios.post('web/user/signup/teacher', params)
        .then(packEmptyData)
        .catch(err => packErrorWrap(err, [
            [10002, '验证码过期或有误']
        ]));
}

export const getVerificationCode: (params: { email: string }) => ResType<boolean> = (params) => {
    return _axios.post('/web/user/verificationCode', params)
        .then(res => ({ code: res.data.code, data: res.data.data }))
        .catch(err => packErrorWrap(err, [
            [10003, '查询不到该邮箱，请检查信息']
        ]))
}

export const checkEmailUnique: (params: { email: string }) => ResType<{ isUnique: boolean }> = (params) => {
    return _axios({
        method: "GET",
        url: '/web/user/email',
        params: {
            email: encodeURIComponent(params.email)
        }
    })
        .then(value => ({ code: 0, data: { isUnique: value.data.data } }))
        .catch(err => packErrorWrap(err, [
            [10003, '查询不到该邮箱，请检查信息']
        ]))
}

interface loginReq {
    username: string,
    password: string
}
interface loginRes {
    role?: 0 | 1,
    token?: string,
    message?: string,
}
export const login: (params: loginReq) => ResType<loginRes> = (params) => {
    return _axios.post('/web/login', params)
        .then(value => {
            setTokens(value.data.data.token, value.data.data.refresh_token);
            return packEmptyData();
        })
        .catch(err => packErrorWrap(err, [
            [-19998, '学工号或密码过长，请重新输入'],
            [-19999, '学工号或密码不为空，请重新输入'],
            [10002, '学工号或密码错误，请重新输入'],
        ]))
}

interface changePswReq {
    email: string;
    password: string;
    verificationCode: string
}
export const changePsw: (params: changePswReq) => ResType<any> = (params) => {
    return _axios({
        method: 'POST',
        url: '/web/user/password',
        data: params
    })
        .then(packEmptyData)
        .catch(err => packErrorWrap(err, [
            [10002, '验证码过期，请重新获取'],
            [10003, '该邮箱尚未注册，请检查信息']
        ]))
}