import _axios from "../axios";
import { ResType } from "../type";
import { packError, packEmptyData } from "../pack"
import { packCodingTime, packAccountInfo } from '../packCommon';
import { userInfoType } from '@/type';
import { setUserInConfig } from "../../storage";

export const getUserInfoByToken: () => ResType<userInfoType> = () => {
    return _axios({
        method: 'GET',
        url: '/web/user'
    }).then(value => {
        const user = packAccountInfo(value.data.data)
        setUserInConfig(user)
        return {
            code: 0,
            data: user
        }
    }).catch(packError)
}

interface editReq {
    realName: string;
    major: string;
    organization: string;
    gender: number;
    grade: number;
    college: string;
}

export const editUserInfo: (params: editReq) => ResType<''> = (params) => {
    return _axios({
        method: 'PUT',
        url: '/web/user',
        data: {
            ...params,
            real_name: params.realName
        }
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