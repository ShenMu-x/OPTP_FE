import _axios from '../axios';
import { ResType } from '../type';
import { packError, packEmptyData } from "../pack";

export const examine: (params: {
    courseId: number,
    stuIds: number[],
    isPermitted: boolean,
}) => ResType<any> = (params) => {
    return _axios({
        method: "POST",
        url: "/web/course/examine",
        data: params,
    })
        .then(packEmptyData)
        .catch(packError)
}