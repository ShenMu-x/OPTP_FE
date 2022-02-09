import _axios from "./axios"
import { getToken } from '@/utils/storage';

type IdeUrlRes = {
    labId: string
}

type IdeUrlReq = any;

export const fetchIdeUrl: (params: IdeUrlRes) => Promise<IdeUrlReq> = (params) => {
    return _axios({
        method: 'POST',
        url: '/web/ide',
        data: params,
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
    return _axios.post('', params).then(value => {
        console.log(value);
        return value;
    }).catch(err => {
        console.log('Error fetchIdeUrl', err, typeof err);
        return err;
    })
}