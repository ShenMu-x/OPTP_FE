import { validateEmail } from '@/utils/helper';

export const createAccountRule = {
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
