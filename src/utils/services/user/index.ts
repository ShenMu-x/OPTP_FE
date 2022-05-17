import _axios from "../axios";
import { ResType } from "../type";
import { packError, packEmptyData } from "../pack"
import { packCodingTime } from '../packCommon';
import { userInfoType } from '@/type';
import { setUserInConfig } from "../../storage";
import { DEFAULT_AVATAR } from "../../option";

export const getUserInfoByToken: () => ResType<userInfoType> = () => {
    return _axios({
        method: 'GET',
        url: '/web/user'
    }).then(value => {
        const user = {
            email: value.data.data.email,
            userId: value.data.data.user_id,
            num: value.data.data.num,
            realName: value.data.data.real_name,
            avatarUrl: value.data.data.avatar_url || DEFAULT_AVATAR,
            gender: value.data.data.gender,
            major: value.data.data.major,
            organization: value.data.data.organization,
            role: value.data.data.role
        }
        setUserInConfig(user)
        return {
            code: 0,
            data: user
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
                    codingTime: packCodingTime(value.data.data.coding_time) ?? []
                }
            }
        })
        .catch(packError)
}