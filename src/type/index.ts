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
    sex?: number,
    avatar?: string,
}

export type commentType = {
    courseCommentId: string,
    userName: string,
    commentText: string,
    createdAt: string
};

export type commentReplyType = {
    replyId: string,
    username: string,
    replyUsername: string,
    commentText: string,
    createdAt: string,
};

export type commentItemType = {
    comment: commentType,
    replyComments: Array<commentReplyType>
}

export type commentsType = Array<commentItemType>;
export type replyCommentsType = Array<commentReplyType>;