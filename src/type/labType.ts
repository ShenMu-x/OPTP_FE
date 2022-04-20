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

export const emptyLab: labType = {
    labId: 0,
    courseId: 0,
    courseName: '',
    title: '',
    content: '',
    createdAt: '',
    updatedAt: '',
    deadLine: '',
    score: 0,
    isFinish: false,
    commment: '',
    attachmentUrl: '',
    reportUrl: '',
}