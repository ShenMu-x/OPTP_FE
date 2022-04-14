import _axios from "../axios";
import { ResType, ListRes } from "../type";
import { packError, packErrorWrap } from "../pack";
import { packLab } from "./pack";
import { labType } from '@/type';

// 根据labId获取实验信息
export const getLabById: (labId: number) => ResType<labType> = (labId) => {
    return _axios({
        method: "GET",
        url: `/web/lab/${labId}`,
    }).then((res) => {
        return {
            code: 0,
            data: packLab(res.data.data)
        }
    }).catch(err => packErrorWrap(err, [
        [-19999, '该实验不存在']
    ]))
}

// 获取课程实验列表
interface getCourseLabReq {
    pageCurrent: number,
    pageSize: number,
    courseId: number
}
export const getCourseLabList: (params: getCourseLabReq) => ResType<ListRes<labType>> = (params) => {
    return _axios({
        method: "GET",
        url: "/web/lab",
        params,
    })
        .then(res => ({
            code: 0,
            data: {
                records: res.data?.records?.map((item: any) => packLab(item)) || [],
                pageInfo: res.data?.page_info || { total: 0 }
            }
        }))//返回结构不同于其他，res.data / res.data.data
        .catch(packError)
}