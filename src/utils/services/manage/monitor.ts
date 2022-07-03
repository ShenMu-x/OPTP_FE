import _axios from "../axios";
import { ResType } from "../type";
import { packError } from "../pack";

export const fetchMonitorUrl: () => ResType<{ url: string }> = () => {
    return _axios({
        method: 'POST',
        url: '/admin/monitor'
    }).then(res => ({
        code: 0,
        data: {
            url: res.data.data.url
        }
    })
    ).catch(packError)
}