import { validateEmail } from '@/utils/helper';

export const createAccountRule = {
    email: [
        {
            required: true,
            message: '请输入邮箱名称',
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
    number: [
        {
            required: true,
            message: '请输入学工号',
            trigger: 'blur',
        }
    ],
    name: [
        {
            required: true,
            message: '请输入真实姓名',
            trigger: 'blur',
        },
    ]
};
