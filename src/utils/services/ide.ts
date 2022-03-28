import _axios from "./axios"
import { ResType } from "./type";
import { packError, packEmptyData } from "./pack";
import { dataTool } from "echarts";

type ideUrlReq = any;
export const fetchIdeUrl: (labId: number) => ResType<ideUrlReq> = (labId) => {
    return _axios({
        method: 'POST',
        url: '/web/ide',
        data: { labId },
    }).then(res => ({
        code: 0,
        data: res.data.data
    })
    ).catch(packError)
}