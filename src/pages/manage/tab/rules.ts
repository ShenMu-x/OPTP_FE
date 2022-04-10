import { validateEmail } from '@/utils/helper';

export const getRegisterRule = (params: {
    pswCheck: any
}) => {
    return {
        email: [
            {
                required: true,
                message: '请输入邮箱',
                trigger: 'blur',
            },
            {
                pattern: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$',
                message: '请输入正确格式的邮箱',
                trigger: 'blur'
            },
            {
                validator: validateEmail,
                trigger: 'blur'
            }
        ],
        verificationCode: [
            {
                required: true,
                message: '请输入验证码',
                trigger: 'blur',
            },
            {
                min: 6,
                max: 6,
                message: '请输入6位验证码',
                trigger: 'blur',
            },
        ],
        realName: [
            {
                required: true,
                message: '请输入真实姓名',
                trigger: 'blur',
            },
        ],
        major: [
            {
                required: true,
                message: '请输入专业名称',
                trigger: 'blur',
            },
        ],
        num: [
            {
                required: true,
                message: '请输入学号',
                trigger: 'blur',
            },
        ],
        password: [
            {
                required: true,
                message: '请输入密码，6-8位，包含字母与数字',
                trigger: 'blur',
            },
        ],
        passwordCheck: [
            {
                required: true,
                message: '请再次输入密码',
                trigger: 'blur',
            },
            {
                validator: (rule: any, value: any, callback: any) => {
                    if (value === '') {
                        callback(new Error('请再次输入密码'))
                    } else if (value !== params.pswCheck?.()) {
                        callback(new Error("密码确认错误"))
                    } else {
                        callback()
                    }
                },
                trigger: 'blur'
            }
        ],
    };
}

export const getCourseRule = () => {
    return {
        name: [
            {
                required: true,
                message: '请输入课程名称',
                trigger: 'blur',
            }
        ],
        description: [
            {
                required: true,
                message: '请输入课程描述',
                trigger: 'blur',
            }
        ],
        secretKey: [
            {
                required: true,
                message: '请输入6位选课密码',
                trigger: 'blur',
            },
        ]
    }
}

export const getLoginRule = () => ({
    userName: [
        {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur',
        },
        {
            pattern: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$',
            message: '请输入正确格式的邮箱',
            trigger: 'blur'
        },
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
        },
    ]
})