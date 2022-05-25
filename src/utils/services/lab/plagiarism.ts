import _axios from "../axios";
import { ResType, ListRes } from "../type";
import { packError, packPageRes, packErrorWrap } from "../pack";
import { requestDomain } from '../../option';

const packCurrentPlagiarism = (item: {
    user_id_1: number; user_id_2: number; real_name_1: string; real_name_2: string;
    num_1: string; num_2: string; url: string; similarity: string;
}) => ({
    userId1: item.user_id_1,
    userId2: item.user_id_2,
    realName1: item.real_name_1,
    realName2: item.real_name_2,
    num1: item.num_1,
    num2: item.num_2,
    url: item.url,
    similarity: item.similarity + '%'
})

export type currentPlagiarismType = {
    userId1: number,
    userId2: number,
    realName1: string,
    realName2: string,
    num1: string,
    num2: string,
    url: string,
    similarity: string
}
// 获取当前实验查重记录
export const getCurrentLabPlagiarism: (common: { labId: number }) => ResType<currentPlagiarismType[]> = ({ labId }) => {
    return _axios({
        method: "GET",
        url: `/web/lab/summit/plagiarism/${labId}`,
    })
        .then(res => ({
            code: 0,
            data: res.data.data.map(packCurrentPlagiarism)
        }))
        .catch(err => packErrorWrap(err, [
            [-19999, '本实验下暂无重复率较高记录']
        ]))
}
// 获取历史实验查重记录
export const getHistoryLabPlagiarism: (common: { reportId: number }) => ResType<currentPlagiarismType[]> = ({ reportId }) => {
    return _axios({
        method: "GET",
        url: `/web/lab/plagiarism_view/${reportId}`,
    })
        .then(res => ({
            code: 0,
            data: res.data.data.map(packCurrentPlagiarism)
        }))
        .catch(err => packErrorWrap(err, [
            [-19999, '本实验下暂无重复率较高记录']
        ]))
}

// 获取查重报告详情
export const requestPlagiarismDetailURL: (urlIncludeDomain: string) => ResType<string> = (urlIncludeDomain) => {
    const url = urlIncludeDomain.split(requestDomain)[1];
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

// 分页获取历史查重列表
interface historyPlagiarismListRes {
    id: number;
    createdAt: string;
}
const packHistoryPlagiarismInfo = (item: { id: number; created_at: string; }) => ({
    id: item.id,
    createdAt: item.created_at,
})
export const getHistoryPlagiarismList: (common: {
    labId: number,
    pageCurrent: number,
    pageSize: number
}) => ResType<ListRes<historyPlagiarismListRes>> = ({ labId, pageCurrent, pageSize }) => {
    return _axios({
        method: "GET",
        url: `/web/lab/plagiarism_history/${labId}`,
        params: {
            pageCurrent,
            pageSize
        }
    })
        .then(res => packPageRes(res, packHistoryPlagiarismInfo))
        .catch(packError)
}