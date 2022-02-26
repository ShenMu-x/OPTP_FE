export type labType = {
    id: number,
    courseId: number,
    title: string,
    content: string,
    createAt?: string,
    deadLine: string,
    updatedAt?: string,
    attachmentUrl: string
    isFinished?: boolean,
    reviews?: string
}

export type labsType = Array<labType>;

export type labStatus = {
    uid: string,
    name: string,
    codeTime: number,
    isFinish: number,
    review: string,
    score: number
}