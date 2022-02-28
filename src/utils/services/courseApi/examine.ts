import _axios from '../axios';
import { ResType } from '../type';

export const premit: (params: {
    courseId: number,
    stuIds: number[],
    isPermitted: boolean,
}) => ResType<any> = (params) => {
    return _axios({
        method: "POST",
        url: "/web/course/examine",
        data: params,
    }).then(res => {
        return { code: 0 }
    }).catch(err => {
        return { code: -1 }
    })
}