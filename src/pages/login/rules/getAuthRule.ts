import { validateEmail } from '@/utils/helper';
export const getAuthRule = (params: {
    getPswCheck: any
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
                min: 4,
                max: 4,
                message: '请输入4位验证码',
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
                    } else if (value !== params.getPswCheck?.()) {
                        callback(new Error("密码确认错误"))
                    } else {
                        callback()
                    }
                },
                trigger: 'blur'
            }
        ],
    }
}