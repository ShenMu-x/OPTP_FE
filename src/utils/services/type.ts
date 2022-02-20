export type ResponseType<T> = {
    code: number,
    data?: any & T,
    error?: {
        message: string
    }
}