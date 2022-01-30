export const validateName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入真实姓名'));
  } else {
    callback();
  }
};

export const validateMajor = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入真实专业'));
  } else {
    callback();
  }
};

export const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入真实姓名'));
  } else {
    callback();
    // 邮箱校验
    //   let self = this
    //   this.axios({
    //     method: "get",
    //     url: "/web/user/email",
    //     data: {
    //       email:self.registerForm.email
    //     },
    //   }).then((res) => {
    //         console.log(res);
    //         let usable = res.data.data
    //         console.log(usable)
    //         if (usable == false){
    //           callback(new Error('该邮箱已被注册，请更换邮箱或直接登录'))
    //         }
    //       }
    //   );
  }
};