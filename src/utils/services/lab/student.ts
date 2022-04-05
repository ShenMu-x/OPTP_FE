import _axios from "../axios";
import { ResType, ListRes } from "../type";
import { packEmptyData, packError, packPageRes } from "../pack";
import { packLab } from "./pack";
import { labType } from '@/type';

// 获取个人实验列表
export const getMyLabs: (params: {
    pageCurrent: number,
    pageSize: number,
}) => ResType<ListRes<labType>> = (params) => {
    return _axios({
        method: "GET",
        url: "/web/lab/student",
        params,
    })
        .then(res => packPageRes(res, packLab))
        .catch(packError)
}
// 修改实验完成状态
export const setLabStatus: (params: {
    isFinish: boolean,
    labId: number
}) => ResType<''> = (params) => {
    return _axios({
        method: "POST",
        url: "/web/lab/summit/code",
        data: params,
    })
        .then(packEmptyData)
        .catch(packError)
}