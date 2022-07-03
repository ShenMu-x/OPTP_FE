export type CourseType = {
    courseId?: number,
    teacherId?: number,
    teacherName?: string,
    teacherEmail?: string,
    teacherAvatar?: string,
    courseName?: string,
    courseDes?: string,
    picUrl?: string,
    secretKey?: string,
    needAudit?: boolean,
    isClose?: boolean,
    language?: number,
    createdAt?: string,
    updatedAt?: string,
    isEnroll?: boolean
}
export const emptyCourseInfo: CourseType = {
    courseId: 0,
    teacherId: 0,
    teacherName: '',
    teacherEmail: '',
    teacherAvatar: '',
    courseName: '',
    courseDes: '',
    picUrl: '',
    secretKey: '',
    needAudit: true,
    isClose: false,
    language: 0,
    createdAt: '',
    updatedAt: '',
    isEnroll: false
}
export type CourseListType = Array<CourseType>