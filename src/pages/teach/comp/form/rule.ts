import { validateCourseName } from '@/utils/helper/validate';

export const labRules = {
    labName: [
        {
            required: true,
            message: '请输入实验名称',
            trigger: 'blur',
        },
        {
            validator: validateCourseName,
            trigger: 'blur'
        }
    ],
    description: [
        {
            required: true,
            message: '请输入实验介绍',
            trigger: 'blur',
        },
    ],
    endAt: [
        {
            required: true,
            message: '请输入截止时间',
            trigger: 'blur',
        },
    ]
};

export const courseRules = {
    courseName: [
        {
            required: true,
            message: '请输入课程名称',
            trigger: 'blur',
        },
        {
            validator: validateCourseName,
            trigger: 'blur'
        }
    ],
    courseDes: [
        {
            required: true,
            message: '请输入课程介绍',
            trigger: 'blur',
        },
    ],
    secretKey: [
        {
            required: true,
            message: '请输入选课密码',
            trigger: 'blur',
        },
    ]
};