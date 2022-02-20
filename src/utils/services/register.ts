import _axios from "./axios";
import { setToken,setRole } from '@/utils/storage';
import { ResponseType } from './type';

type stuRegisterParamsType = {
    email: string;
    realName: string;
    num: string;
    gender: number;
    password: string;
    major: string;
    organization: string;
    verificationCode: string;
}


export const stuRegister: (params: stuRegisterParamsType) => Promise<any> = (params) => {
    return _axios.post('/web/user/signup/stu', params).then(value => {
        console.log(value.data);
        console.log(params)
    }).catch(err => {
        console.log('[Error - stuRegister]', err);
    });

}

type verificationCodeResType = {
    code: number,
    data: boolean;
}

export const getVerificationCodeApi: (params: { email: string }) => Promise<verificationCodeResType> = (params) => {
    return _axios.post('/web/user/verificationCode', params)
        .then(res => {
            const packRes = {
                code: res.data.code,
                data: res.data.data
            }
            console.log('xh-->code', packRes)
            return packRes;
        })
        .catch(err => {
            console.log('[Error - getVerificationCodeApi]', err);
            return {
                code: -1,
                data: false
            }
        })
}

type emailUniqueReq = {
    code: number,
    isUnique?: boolean,
    error?: {
        message: string
    }
}

export const checkEmailUnique: (params: { email: string }) => Promise<emailUniqueReq> = (params) => {
    return _axios({
        method: "GET",
        url: '/web/user/email',
        params: {
            email: encodeURIComponent(params.email)
        }
    }).then(value => {
        console.log(value);
        return {
            code: value.data.code,
            isUnique: value.data.data
        }
    }).catch((err: Error) => {
        return {
            code: -1,
            error: {
                message: err.message
            }
        }
    })
}

type loginResType = {
    code: number,
    data: {
        role?: 0 | 1,
        token?: string,
        message?: string,
    }
}

export const loginApi: (params: { username: string, password: string }) => Promise<loginResType> = (params) => {
    return _axios.post('/web/login', params)
        .then(value => {
            const res = {
                code: value.data.code ?? -1,
                data: {
                    role: value.data.data.role,
                    token: value.data.data.token
                }
            }

            if (res.code === 0) {
                setToken(res.data.token);
                setRole(res.data.role);
            }

            console.log(res);
            return res;
        })
        .catch((err: any) => {
            let errorMsg = '';
            switch (err.response?.data?.code) {
                case -19998: {
                    errorMsg = '账号或密码过长，请重新输入';
                    break;
                }
                case -19999: {
                    errorMsg = '账号或密码不为空，请重新输入';
                    break;
                }
                case 10002: {
                    errorMsg = '验证失败，账号或密码输入错误';
                    break
                }
                default: {
                    errorMsg = '验证出错，请稍后再试'
                }
            }
            return {
                code: err.response?.data?.code,
                data: {
                    message: errorMsg,
                }
            }
        });
}