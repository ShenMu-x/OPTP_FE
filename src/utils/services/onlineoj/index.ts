import _axios from "../axios"
import { ResType } from "../type";

export const fetchCodeResult: (params: { language: number, code: string }) => ResType<{
    status: number,
    title: string,
    description: string
}> = (params) => {
    return _axios({
        method: 'POST',
        url: '/web/monaco/exec',
        data: params,
    }).then(res => ({
        code: 0,
        data: {
            status: res.data.status ?? 1,
            title: res.data.title ?? '执行超时',
            description: res.data.description ?? ''
        }
    })
    ).catch(_ => ({
        code: 2,
        errorMsg: '运行出错，请检查代码',
    }))
}