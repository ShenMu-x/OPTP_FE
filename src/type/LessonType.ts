export type LessonType = {
    courseId: string,
    courseName: string,
    isClose?: number,
    description?: string,
    createdAt: string | number,
    coverUrl?: string
}

export type LessonListType = Array<LessonType>