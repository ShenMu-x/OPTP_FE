export const createAccountRule = {
    number: [
        {
            required: true,
            message: '请输入账号',
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

export const editAccountPasswordRule = {
    password: [
        {
            required: true,
            message: '请输入密码，6-8位，包含字母或数字',
            trigger: 'blur',
        }
    ]
}
