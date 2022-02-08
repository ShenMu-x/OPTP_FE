import { LessonListType } from "@/type";

export const mockLessonsData: LessonListType = [
    {
        courseId: '1',
        courseName: '一节课ddddddddddddddddddddddddddd',
        isClose: 1,
        description: '',
        createdAt: Date.now(),
        coverUrl: ''
    },
    {
        courseId: '2',
        courseName: '一节课',
        isClose: 0,
        description: '门店名称撒dons从你我是怕陈年往门店名称撒dons从你我是怕陈年往事的农产品按产品十大女仆南师大VS的女仆四年事的农产品按产品十大女仆南师大VS的女仆四年',
        createdAt: Date.now(),
        coverUrl: ''
    }, {
        courseId: '3',
        courseName: '一节课',
        isClose: 0,
        description: '年往门店名称撒dons从你我是怕陈年往事的年往门店名称撒dons从你我是怕陈年往事的',
        createdAt: new Date().toDateString(),
        coverUrl: ''
    }
];


export const mockLab = [
    {
        labId: '1',
        title: '实验1',
        isFinished: false,
        createAt: '2022-03-01',
        endAt: '2022-03-06',
        isBelongTo: 'C++课程实验',
        describe: 'nonono'
    }, {
        labId: '2',
        title: '实验2',
        isFinished: true,
        createAt: '2022-03-01',
        endAt: '2022-03-06',
        isBelongTo: 'JavaScript高级程序设计',
        describe: 'yesyes'
    }
]