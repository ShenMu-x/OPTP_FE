export const getAuthRule = (params: {
    getPasswordFirstInput: any
}) => {
    return {
        number: [
            {
                required: true,
                message: '请输入学号',
                trigger: 'blur',
            }
        ],
        verificationCode: [
            {
                required: true,
                message: '请输入验证码',
                trigger: 'blur',
            }
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
                    } else if (value !== params.getPasswordFirstInput?.()) {
                        callback(new Error("两次密码不一致,请检查输入"))
                    } else {
                        callback()
                    }
                },
                trigger: 'blur'
            }
        ],
    }
}