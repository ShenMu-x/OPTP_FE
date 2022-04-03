export type labType = {
    labId?: number,
    courseId?: number,
    courseName?: string,
    title?: string,
    content?: string,
    createdAt?: string,
    updatedAt?: string,
    deadLine?: string,
    score?: number,
    isFinish?: boolean,
    commment?: string,
    attachmentUrl?: string
    reportUrl?: string,
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