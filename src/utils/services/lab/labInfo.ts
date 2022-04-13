import _axios from "../axios";
import { ResType } from "../type";
import { packError, packEmptyData } from "../pack";

interface createLabReq {
    courseId: number,
    title: string,
    content: string,
    attachmentUrl: string,
    deadLine: string
}
export const createLab: (params: createLabReq) => ResType<''> = (params) => {
    return _axios({
        method: "POST",
        url: "/web/lab",
        data: params,
    })
        .then(packEmptyData)
        .catch(packError)
}

interface editLabReq {
    labId: number,
    title: string,
    content: string,
    attachmentUrl: string,
    deadLine: string
}
export const editLab: (params: editLabReq) => ResType<''> = (params) => {
    return _axios({
        method: "PUT",
        url: "/web/lab",
        data: params,
    })
        .then(packEmptyData)
        .catch(packError)
}

export const deleteLab: (labId: number) => ResType<''> = (labId) => {
    return _axios({
        method: "DELETE",
        url: '/web/lab',
        data: {
            labId
        }
    })
        .then(packEmptyData)
        .catch(packError)
}