import _axios from "../axios"
import { ResType } from "../type";
import { packError } from "../pack";

export const fetchIdeUrl: (labId: number) => ResType<{ url: string }> = (labId) => {
    return _axios({
        method: 'POST',
        url: '/web/ide',
        data: { labId },
    }).then(res => ({
        code: 0,
        data: {
            url: res.data?.data?.url
        }
    })
    ).catch(packError)
}

export const getIDEtoCheckCode: (params: { labId: number, studentId: number }) => ResType<{url: string}> = (params) => {
    console.log(params)
    return _axios({
        method: 'POST',
        url: '/web/lab/check_code',
        data: {
            labId: params.labId,
            stuId: params.studentId
        },
    }).then(res => ({
        code: 0,
        data: {
            url: res.data?.data?.url
        }
    })
    ).catch(packError)
}