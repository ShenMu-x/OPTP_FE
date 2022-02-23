export const lesson = {
    courseId: 2,
    courseName: '一节课',
    isClose: false,
    courseDes: '门店名称撒dons从你我是怕陈年往门店名称撒dons从你我是怕陈年往事的农产品按产品十大女仆南师大VS的女仆四年事的农产品按产品十大女仆南师大VS的女仆四年',
    createdAt: '2202-02-22',
    picUrl: ''
};

export const teacher = {
    userId: 1,
    email: 'xxx@111.com',
    userName: '用户名',
    uid: '123456789',
    major: '计算机科学与技术',
    organization: '华南师范大学',
    sex: 1
};

export const commentsMock = [
    {
        comment: {
            courseCommentId: '123',
            userName: 'mock',
            commentText: 'text1',
            createdAt: '2022-01-23'
        },
        replyComments: [{
            replyId: '1234',
            username: 'mock_reply',
            replyUsername: 'mock',
            commentText: 'reply_text',
            createdAt: '2022-05-06',
        }, {
            replyId: '12355',
            username: 'mock_reply',
            replyUsername: 'mock',
            commentText: 'reply_text',
            createdAt: '2022-05-06',
        }]
    },
    {
        comment: {
            courseCommentId: '123',
            userName: 'mock',
            commentText: '《大学生心理健康》课程是华南师范大学心理咨询研究中心面向在校大学生开设的一门非正式课程，目标在于增强学生心理健康意识，掌握心理调适特别是情绪管理的方法，培养良好心理素质，促进人格和谐发展。\
            课程内容活动包括两大模块：线上心理健康理论知识与线下心理健康实践教学。线上理论教学合计44课时11小时，线上实践教学合计40课时5小时（非正式课程1小时相当于正式课程的理论教学4学时或实践教学8学时）\
            心理健康理论知识由学校心理咨询研究中心通过录制在线课程供学生线上学习的形式来完成。\
            心理健康教育实践活动主要通过各类心理健康教育活动组织完成，如心理情景剧、心理电影赏板、心理测评、角色扮演、团体培训、沙盘游戏、绘画、舞动、瑜伽等方式进行实践体验，从而能够加深对心理健康的理解，并能直观感受和了解自己的心理状态，进一步提升心理素质。\
            请选了课但还未进课程群的同学加入qq群：619150561，获取最新课程通知，祝大家学习愉快！',
            createdAt: '2022-01-23'
        },
        replyComments: [{
            replyId: '1235',
            username: 'mock_reply',
            replyUsername: 'mock',
            commentText: 'reply_text',
            createdAt: '2022-05-06',
        }]
    }
];