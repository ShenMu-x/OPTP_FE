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