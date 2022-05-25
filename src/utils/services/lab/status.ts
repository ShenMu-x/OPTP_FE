import _axios from "../axios";
import { ResType, ListRes } from "../type";
import { fmatTime } from '../../helper';
import { packError, packPageRes } from "../pack";

export type homeworkType = {
    id: number,
    labId: number,
    userId: number,
    reportUrl: string,
    score: number,
    isFinish: boolean,
    comment: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    number: string,
    codingTime: number
}
const packHomework = (item: {
    ID: number,
    LabID: number,
    UserID: number,
    ReportURL: string,
    Score: number,
    IsFinish: boolean,
    Comment: string,
    CreatedAt: string,
    UpdatedAt: string,
    Name: string,
    Number: string,
    CodingTime: number
}) => ({
    id: item.ID,
    labId: item.LabID,
    userId: item.UserID,
    reportUrl: item.ReportURL,
    score: item.Score,
    isFinish: item.IsFinish,
    comment: item.Comment,
    createdAt: fmatTime(item.CreatedAt),
    updatedAt: fmatTime(item.UpdatedAt),
    name: item.Name,
    number: item.Number,
    codingTime: item.CodingTime
})

// 获取学生完成情况
interface req {
    labId: number,
    pageSize: number,
    pageCurrent: number
}
export const getHomeworkStatus: (params: req) => ResType<ListRes<homeworkType>> = (params) => {
    return _axios({
        method: "GET",
        url: `/web/lab/summit/${params.labId}`,
        params: {
            pageCurrent: params.pageCurrent,
            pageSize: params.pageSize
        }
    })
        .then(res => packPageRes(res, packHomework))
        .catch(packError)
}

// 获取实验编译失败记录
export const getLabErrorLog: (labId: number) => ResType<{ compilerErrorLog: string }> = (labId) => {
    return _axios({
        method: "GET",
        url: `/web/lab/summit/compile_error_log/${labId}`,
    })
        .then(res => ({
            code: 0,
            compilerErrorLog: res.data.data.compiler_error_log
        }))
        .catch(packError)
}