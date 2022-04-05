import _axios from "./axios";
import { ResType } from "./type";
import { packError } from "./pack";

// 导出签到表
export const exportCsv: (url: string) => ResType<{ csvData: any }> = (url) => {
    return _axios({
        responseType: "blob",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        method: 'GET',
        url: url
    }).then(res => {
        return {
            code: 0,
            data: {
                csvData: res.data
            }
        }
    }).catch(packError)
}