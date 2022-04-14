import _axios from '../../axios';
import { ResType } from '../../type';
import { packError, packErrorWrap, packEmptyData } from "../../pack";

// 申请加入课程
export const askJoinInCourse: (params: {
    courseId: number,
    secretKey: string,
}) => ResType<any> = (params) => {
    return _axios({
        method: "POST",
        url: "/web/course/attend",
        data: params
    })
        .then(packEmptyData)
        .catch(err => packErrorWrap(err, [
            [10002, '选课密码错误']
        ]))
}

// 退出课程
export const quitCourse: (params: {
    courseId: number,
}) => ResType<any> = (params) => {
    return _axios({
        method: 'DELETE',
        url: '/web/course/quit',
        data: params
    })
        .then(packEmptyData)
        .catch(packError)
}