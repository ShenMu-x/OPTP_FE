// 管理员中Account与course部分数据字段与教师/学生端不同
export const emptyAccount = {
    userId: 0,
    email: '',
    num: '',
    realName: '',
    avatarUrl: '',
    gender: 0,
    major: '',
    organization: ''
}
export const emptyCourse = {
    courseId: 0,
    name: '',
    description: '',
    language: 0,
    secretKey: '',
    picUrl: '',
    isClosed: false,
    createdAt: '',
    updatedAt: '',
    needAudit: true
}