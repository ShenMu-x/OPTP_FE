import _axios from "./axios";
import { ResType } from './type';
import { setToken, setRole } from '@/utils/storage';
import { packError, packEmptyData } from "./pack";
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

export const stuRegister: (params: RegisterReq) => ResType<''> = (params) => {
    return _axios.post('/web/user/signup/stu', params)
        .then(packEmptyData)
        .catch(packError);
}

export const teachRegister: (params: RegisterReq) => ResType<''> = (params) => {
    return _axios.post('web/user/signup/teacher', params)
        .then(packEmptyData)
        .catch(packError);
}

export const getCode: (params: { email: string }) => ResType<boolean> = (params) => {
    return _axios.post('/web/user/verificationCode', params)
        .then(res => ({ code: res.data.code, data: res.data.data }))
        .catch(err => {
            if (err.response.data.code === 10003) {
                return {
                    code: 10003,
                    errorMsg: '查询不到该邮箱，请更换邮箱'
                }
            }
            else return packError(err);
        })
}


export const checkEmailUnique: (params: { email: string }) => ResType<{ isUnique: boolean }> = (params) => {
    return _axios({
        method: "GET",
        url: '/web/user/email',
        params: {
            email: encodeURIComponent(params.email)
        }
    }).then(value => ({ code: 0, data: { isUnique: value.data.data } })
    ).catch(err => {
        if (err.response.data.code === 10003) {
            return {
                code: 10003,
                errorMsg: '查询不到该邮箱，请更换邮箱'
            }
        }
        else return packError(err);
    })
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
            const res = {
                code: 0,
                data: {
                    role: value.data.data.role,
                    token: value.data.data.token
                }
            }
            setToken(res.data.token);
            setRole(res.data.role);
            return res;
        })
        .catch(err => {
            let message = err.response?.data?.message;
            switch (err.response?.data?.code) {
                case -19998: {
                    message = '账号或密码过长，请重新输入';
                    break;
                }
                case -19999: {
                    message = '账号或密码不为空，请重新输入';
                    break;
                }
                case 10002: {
                    message = '验证失败，账号或密码输入错误';
                    break;
                }
                default: {
                    message = err.response?.data?.message || '服务异常，请稍后再试';
                }
            }
            return {
                code: err.response?.data?.code,
                errorMsg: message
            }
        });
}

interface pswReq {
    email: string;
    password: string;
    verificationCode: string
}

export const changePsw: (params: pswReq) => ResType<any> = (params) => {
    return _axios({
        method: 'POST',
        url: '/web/user/password',
        data: params
    })
        .then(packEmptyData)
        .catch(err => {
            const code = err.response.data.code;
            if (code === 10002) {
                return {
                    code: 10003,
                    errorMsg: '验证码已过期，请重新输入'
                }
            } else if (code === 10003) {
                return {
                    code: 10003,
                    errorMsg: '该邮箱尚未注册'
                }
            }
            else return packError(err);
        })
}