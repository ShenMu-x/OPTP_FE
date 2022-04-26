import { reactive } from 'vue';

const common = reactive<{ commentCount: number }>({ commentCount: 0 })
export const setCommentCount: (count: number) => void = count => common.commentCount = count;
export const getCommentCount = () => common.commentCount;