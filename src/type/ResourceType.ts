export type ResourceType = {
    resourceId: number,
    courseId: number,
    title: string,
    content: string,
    attachmentUrl: string,
    createAt: string,
    updateAt: string
}
export const emptyResource: ResourceType = {
    resourceId: 0,
    courseId: 0,
    title: '',
    content: '',
    attachmentUrl: '',
    createAt: '',
    updateAt: ''
}