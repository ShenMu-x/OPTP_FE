// 统一返回接口
export type ResType<T> = Promise<{
    code: number,
    data?: T,
    errorMsg?: string
}> 

// 分页返回
export type ListRes<T> = {
    records: Array<T>,
    pageInfo: {
        total: number,
    }
}