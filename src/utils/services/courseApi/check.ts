import _axios from '../axios';
import { ResType, ListRes } from '../type';

export const checkAttend: (params: {
    pageCurrent: number,
    pageSize: number,
    courseId: number
}) => ResType<ListRes<any>> = (params) => {
    return _axios({
        method: "get",
        url: "/web/checkin/records",
        params,
    }).then(res => {
        return {
            code: 0,
            data: {
                records: res.data.data.records?.map((item: any) => ({
                    // userId: item.user_id,
                    // email: item.email,
                    // num: item.num,
                    // realName: item.real_name,
                    // avatarUrl: item.avatar_url,
                    // gender: item.gender,
                    // major: item.major,
                    // organization: item.organization
                })) || [],
                pageInfo: res.data.data?.page_info
            }
        }
    }).catch(err => {
        return { code: -1 }
    })
}
interface addAttendReq {
    secretKey: string,
    courseId: number,
    duration: number,
    name: string,
}

export const addAttend = (params: addAttendReq) => {
    return _axios({
        method: "POST",
        url: "/web/checkin/start",
        data: params,
    }).then(res => {
        return { code: 0 }
    }).catch(err => {
        return { code: -1 }
    })
}