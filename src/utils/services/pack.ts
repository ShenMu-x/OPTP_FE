export const packError = (err: any) => {
    return {
        code: err.response?.data?.code || -1,
        errorMsg: err.response?.data?.message || '服务异常，请稍后再试',
    }
}

export const packEmptyData = () => ({ code: 0 });