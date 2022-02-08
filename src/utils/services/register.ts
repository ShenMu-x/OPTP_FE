import _axios from "./axios";

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