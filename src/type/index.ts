export type LessonType = {
    courseId: string,
    courseName: string,
    isClose?: number,
    description?: string,
    createdAt: string | number,
    coverUrl?: string
}

export type LessonListType = Array<LessonType>

export type userInfoType = {
    email: string,
    userName: string,
    uid: string,
    major?: string,
    organization?: string,
    sex?: string,
}