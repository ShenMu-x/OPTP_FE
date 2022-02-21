import { validateName, validateMajor } from '@/utils/helper/validate';

export const editRules = {
    realName: [
        { validator: validateName, trigger: 'blur' }
    ],
    major: [
        { validator: validateMajor, trigger: 'blur' }
    ]
}