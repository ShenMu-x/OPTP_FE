import _axios from "./axios";
import { ResType } from './type';
import { setToken, setRole } from '@/utils/storage';
import { getUserInfoByTk } from './user';

interface stuRegisterReq {
    email: string;
    realName: string;
    num: string;
    gender: number;
    password: string;
    major: string;
    organization: string;
    verificationCode: string;
}

export const stuRegister: (params: stuRegisterReq) => ResType<''> = (params) => {
    return _axios.post('/web/user/signup/stu', params)
        .then(value => ({ code: 0 }))
        .catch(err => ({
            code: err.response.data.code,
            error: { message: err.response?.data.message }
        }));
}

export const getCode: (params: { email: string }) => ResType<boolean> = (params) => {
    return _axios.post('/web/user/verificationCode', params)
        .then(res => ({ code: res.data.code, data: res.data.data }))
        .catch(err => {
            const code = err.response.data.code;
            let message = err.response.data.message;
            if (code === 10003) message = '查询不到该邮箱，请更换邮箱'
            return { code, error: { message } }
        })
}


export const checkEmailUnique: (params: { email: string }) => ResType<{ isUnique: boolean }> = (params) => {
    return _axios({
        method: "GET",
        url: '/web/user/email',
        params: {
            email: encodeURIComponent(params.email)
        }
    }).then(value => ({ code: 0, isUnique: value.data.data })
    ).catch(err => {
        const code = err.response.data.code;
        let message = err.response.data.message;
        if (code === 10003) message = '查询不到该邮箱，请更换邮箱'
        return { code, error: { message } }
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
                    message = err.response?.data?.message;
                }
            }
            return {
                code: err.response?.data?.code,
                error: { message }
            }
        });
}