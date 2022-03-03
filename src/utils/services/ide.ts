import _axios from "./axios"
import { getToken } from '@/utils/storage';
import { ResType } from "./type";
import { packError } from "./pack";

type IdeUrlReq = any;

export const fetchIdeUrl: (labId: number) => ResType<IdeUrlReq> = (params) => {
    return _axios({
        method: 'POST',
        url: '/web/ide',
        data: params,
    }).then(res => {
        console.log(res);
        return { code: 0 }
    }).catch(packError)
}