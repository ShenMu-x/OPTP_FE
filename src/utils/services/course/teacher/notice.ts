import _axios from '../../axios';
import { ResType } from '../../type';
import { packError, packEmptyData } from "../../pack";

export const createNotice: (params: {
    courseId: number,
    title: string,
    content: string,
    attachmentUrl: String
}) => ResType<''> = (params) => {
    return _axios({
        method: "POST",
        url: "/web/course/resource",
        data: params,
    })
        .then(packEmptyData)
        .catch(packError)
}