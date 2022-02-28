export type CourseType = {
    courseId?: number,
    teacherId?: number,
    teacherName?: string,
    courseName?: string,
    courseDes?: string,
    picUrl?: string,
    secretKey?: string,
    isClose?: boolean,
    language?: number,
    createdAt?: string,
    updatedAt?: string,
    isEnroll?: boolean
}

export type CourseListType = Array<CourseType>

export type ResourceType = {
    resourceId: number,
    courseId: number,
    title: string,
    content: string,
    attachmentUrl: string,
    createAt: string,
    updateAt: string
}