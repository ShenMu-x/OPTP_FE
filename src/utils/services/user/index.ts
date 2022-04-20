import _axios from "../axios";
import { ResType } from "../type";
import { userInfoType } from '@/type';
import { packError, packEmptyData } from "../pack";

export const getUserInfoByToken: () => ResType<userInfoType> = () => {
    return _axios({
        method: 'GET',
        url: '/web/user'
    }).then(value => {
        return {
            code: 0,
            data: {
                email: value.data.data.email,
                userId: value.data.data.user_id,
                num: value.data.data.num,
                realName: value.data.data.real_name,
                avatarUrl: value.data.data.avatar_url,
                gender: value.data.data.gender,
                major: value.data.data.major,
                organization: value.data.data.organization
            }
        }
    }).catch(packError)
}

export const getUserInfoById: (params: { userId: number }) => ResType<userInfoType> = (params) => {
    return _axios({
        method: 'GET',
        url: `/web/user/${params.userId}`
    }).then(value => {
        const res = {
            email: value.data.data.email,
            userId: value.data.data.user_id,
            num: value.data.data.num,
            realName: value.data.data.real_name,
            avatarUrl: value.data.data.avatar_url,
            gender: value.data.data.gender,
            major: value.data.data.major,
            organization: value.data.data.organization
        };
        return {
            code: 0,
            data: res,
        }
    }).catch(packError)
}

interface editReq {
    real_name: string;
    major: string;
    organization: string;
    gender: number;
}

export const editUserInfo: (params: editReq) => ResType<''> = (params) => {
    return _axios({
        method: 'PUT',
        url: '/web/user',
        data: params
    })
        .then(packEmptyData)
        .catch(packError)
}

export const editUserAvatar: (params: { avatar_url: string }) => ResType<''> = (params) => {
    return _axios({
        method: 'PUT',
        url: '/web/user/avatar',
        data: params
    })
        .then(packEmptyData)
        .catch(packError)
}

interface costTimeRes {
    userId: number,
    name: string,
    number: string,
    codingTime: Array<any>;
}

export const getMyCodingTime: () => ResType<costTimeRes> = () => {
    return _axios({
        method: 'GET',
        url: '/web/coding_time'
    })
        .then(value => {
            return {
                code: 0,
                data: {
                    userId: value.data.data.user_id,
                    name: value.data.data.name,
                    number: value.data.data.number,
                    codingTime: value.data.data.coding_time ?? []
                }
            }
        })
        .catch(packError)
}