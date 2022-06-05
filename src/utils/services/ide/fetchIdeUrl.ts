import _axios from "../axios"
import { ResType } from "../type";
import { packError } from "../pack";

export const getIDEUrlForStudent: (labId: number) => ResType<{ url: string, authToken: string }> = (labId) => {
    return _axios({
        method: 'POST',
        url: '/web/ide',
        data: { labId },
    }).then(res => ({
        code: 0,
        data: {
            url: res.data?.data?.url,
            authToken: res.data?.data?.token
        }
    })
    ).catch(packError)
}

export const getIDEUrlForTeacher: (params: { labId: number, studentId: number }) => ResType<{ url: string }> = (params) => {
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