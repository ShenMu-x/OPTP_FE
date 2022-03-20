import _axios from "../axios";
import { ResType, ListRes } from "../type";
import { fmatTime } from '../../helper';
import { packError, packPageRes, packEmptyData } from "../pack";
import { labType } from '@/type';

// 修改实验成绩
export const setLabScore: (params: {
    userId: number,
    score: number,
    labId: number
}) => ResType<ListRes<labType>> = (params) => {
    return _axios({
        method: "PUT",
        url: '/web/lab/summit/score',
        data: params
    })
        .then(packEmptyData)
        .catch(packError)
}
