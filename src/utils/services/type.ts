export type ResType<T> = Promise<{
    code: number,
    data?: any & T,
    error?: {
        message: string
    }
}> 
