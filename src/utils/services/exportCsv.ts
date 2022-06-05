import _axios from "./axios";
import { ResType } from "./type";
import { packError } from "./pack";

export const exportCsv: (url: string) => ResType<{ csvData: Blob }> = (url) => {
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