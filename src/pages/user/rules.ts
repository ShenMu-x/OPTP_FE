import { validateName, validateMajor } from '@/utils/helper/validate';

export const editRules = {
    userName: [
        { validator: validateName, trigger: 'blur' }
    ],
    major: [
        { validator: validateMajor, trigger: 'blur' }
    ],
    uid: [
        {
            required: true,
            message: '请输入学号',
            trigger: 'blur',
        },
    ],
}