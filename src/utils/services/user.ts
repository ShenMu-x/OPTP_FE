import _axios from "./axios";
import { ResType } from "./type";
import { userInfoType } from '@/type';
import store from '@/store';

export const getUserInfoByTk: () => ResType<userInfoType> = () => {
    return _axios({
        method: 'GET',
        url: '/web/user'
    }).then(value => {
        const res = {
            email: value.data.data.email,
            userId: value.data.data.user_id,
            num: value.data.data.num,
            realName: value.data.data.real_name,
            avatar: value.data.data.avatar_url,
            gender: value.data.data.gender,
            major: value.data.data.major,
            organization: value.data.data.organization
        };
        store.commit('setUserInfo', {
            user: res
        })
        return {
            code: value.data.code,
            data: res
        }
    }).catch(err => {
        return {
            code: err.response.data.code,
            error: err.response.data.message
        }
    })
}

interface editReq {
    real_name: string;
    major: string;
    organization: string;
    gender: number;
}

interface editRes {
    code: number,
    data?: any,
    message?: string
}
export const editUserInfo: (params: editReq) => Promise<editRes> = (params) => {
    return _axios({
        method: 'PUT',
        url: '/web/user',
        data: params
    }).then(value => {
        console.log('editUserInfo', value.data);
        if (value.data.code === 0) {
            return {
                code: value.data.code,
            }
        } else {
            return {
                code: value.data.code,
                message: value.data.response?.message
            }
        }
    })
}

export const editUserAvatar: (params: { avatar_url: string }) => Promise<editRes> = (params) => {
    return _axios({
        method: 'PUT',
        url: '/web/user/avatar',
        data: params
    }).then(value => {
        console.log('editAvatar', value.data);
        if (value.data.code === 0) {
            return { code: 0 }
        } else {
            return {
                code: value.data.code,
                message: value.data.response?.message
            }
        }
    })
}

interface costTimeRes {
    code: number,
    data?: {
        userId: number,
        userName: string,
        uid: string,
        codingTime: null | Array<any>;
    },
    message?: string
}

export const getUserCodingTime: () => Promise<costTimeRes> = () => {
    return _axios({
        method: 'GET',
        url: '/web/coding_time'
    }).then(value => {
        console.log('codingTime', value.data);
        if (value.data.code === 0) {
            return {
                code: value.data.code,
                data: {
                    userId: value.data.data.user_id,
                    userName: value.data.data.name,
                    uid: value.data.data.number,
                    codingTime: value.data.data.coding_time
                }
            }
        } else {
            return {
                code: value.data.code,
                message: value.data.response?.message
            }
        }
    })
}