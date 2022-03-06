export type commentType = {
    courseCommentId: number,
    courseId: number,
    commentText: string,
    pid: number,
    userId: number,
    userAvatarUrl: string,
    username: string,
    replyUserId: number,
    createdAt: string,
    updatedAt: string
};

export type commentReplyType = {
    courseCommentId: number,
    courseId: number,
    commentText: string,
    pid: number,
    userId: number,
    userAvatarUrl: string,
    username: string,
    replyUserId: number,
    createdAt: string,
    updatedAt: string,
    replyUsername: string,
};

export type commentItemType = {
    comment: commentType,
    replyComments: Array<commentReplyType>
}

export type commentsType = Array<commentItemType>;
export type replyCommentsType = Array<commentReplyType>;