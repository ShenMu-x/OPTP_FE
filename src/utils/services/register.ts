import _axios from "./axios";
import { setToken } from '@/utils/storage';

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
            // const res = { data: { code: 0, data: true } }

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
    statusCode: number,
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
            statusCode: value.data.code,
            isUnique: value.data.data
        }
    }).catch((err: Error) => {
        return {
            statusCode: -1,
            error: {
                message: err.message
            }
        }
    })
}

export const login: (params: { username: string, password: string }) => Promise<any> = (params) => {
    return _axios.post('/web/login', params)
        .then(value => {
            const res = {
                statusCode: value.data.code ?? -1,
                data: {
                    role: value.data.data.role,
                    token: value.data.data.token
                }
            }

            if (res.statusCode === 0) {
                setToken(res.data.token);
            }
            console.log(res);
            return res;
        })
        .catch((err: Error) => {
            console.log(err.message);
        });
}