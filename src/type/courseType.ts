export type CourseType = {
    courseId: string,
    courseName: string,
    isClose?: number,
    description?: string,
    createdAt: string | number,
    coverUrl?: string
}

export type CourseListType = Array<CourseType>