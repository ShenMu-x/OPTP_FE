import _axios from "./axios";

type userInfoType = {
    statusCode: number,
    data?: {
        userId: number,
        email: string,
        uid: string,
        userName: string,
        avatar: string,
        gender: number,
        major: string,
        organization: string
    },
    error?: string
}

const getUser: () => Promise<userInfoType> = () => {
    return _axios({
        method: 'GET',
        url: '/web/user'
    }).then(value => {
        return {
            statusCode: value.data.code,
            data: {
                email: value.data.data.email,
                userId: value.data.data.userId,
                uid: value.data.data.num,
                userName: value.data.data.real_name,
                avatar: value.data.data.avatar_url,
                gender: value.data.data.gender,
                major: value.data.data.major,
                organization: value.data.data.organization
            }
        }
    }).catch((err: Error) => {
        return {
            statusCode: -1,
            error: err.message
        }
    })
}