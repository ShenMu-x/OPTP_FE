import _axios from "../axios";
import { ResType, ListRes } from "../type";
import { fmatTime } from '../../helper';
import { packError, packPageRes } from "../pack";
import { labType } from '@/type';

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

const packPlagiarism = (item: { user_id_1: number; user_id_2: number; real_name_1: string; real_name_2: string; num_1: string; num_2: string; url: string; similarity: number; }) => ({
    userId1: item.user_id_1,
    userId2: item.user_id_2,
    realName1: item.real_name_1,
    realName2: item.real_name_2,
    num1: item.num_1,
    num2: item.num_2,
    url: item.url,
    similarity: item.similarity
})
// 获取实验查重记录
export type plagiarismType = {
    userId1: number,
    userId2: number,
    realName1: string,
    realName2: string,
    num1: string,
    num2: string,
    url: string,
    similarity: number
}
export const getLabPlagiarism: (labId: number) => ResType<plagiarismType[]> = (labId) => {
    return _axios({
        method: "GET",
        url: `/web/lab/summit/plagiarism/${labId}`,
    })
        .then(res => ({
            code: 0,
            data: res.data.data.map(packPlagiarism)
        }))
        .catch(packError)
}
export const requestPlagiarismURL: (url: string) => ResType<string> = (url) => {
    return _axios({
        method: "GET",
        url,
    })
        .then(res => {
            return {
                code: 0,
                data: res.data
            }
        })
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