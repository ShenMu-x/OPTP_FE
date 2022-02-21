export type ResType<T> = Promise<{
    code: number,
    data?: T,
    error?: {
        message: string
    }
}> 
