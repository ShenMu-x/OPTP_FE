export const packError = (err: any) => {
    return {
        code: err.response?.data?.code || -1,
        errorMsg: err.response?.data?.message || '服务异常，请稍后再试',
    }
}
export const packErrorWrap = (err: any, map: Array<[number, string]>) => {
    const errorMap = new Map<number, string>(map)
    return {
        code: err.response?.data?.code || -1,
        errorMsg: errorMap.get(err.response?.data?.code) || '服务异常，请稍后再试',
    }
}
export const packEmptyData = () => ({ code: 0 });

export const packPageRes = (res: { data: { data: { records: any[]; page_info: { total: number }; }; }; }, pack: (arg0: any) => any) => {
    return {
        code: 0,
        data: {
            records: res.data?.data?.records?.map((item: any) => pack(item)) ?? [],
            pageInfo: res.data?.data?.page_info ?? { total: 0 }
        }
    }
}