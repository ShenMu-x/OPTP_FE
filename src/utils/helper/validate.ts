import { checkEmailUnique } from '@/utils/services';

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

export const validateOrganization = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入所属组织'));
  } else {
    callback();
  }
};


export const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === '') callback(new Error('请输入真实邮箱'));
  else checkEmailUnique({ email: value })
    .then(res => {
      if (res.code === 0 && !res.data?.isUnique) callback('该邮箱已被注册，请更换邮箱或直接登录');
      if (res.code !== 0) callback(res.errorMsg);
      callback();
    })
};

export const validateCourseName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入名称'));
  } else if (value.length > 30) {
    callback(new Error('名称限制在30字以内'));
  } else {
    callback();
  }
};

export const validateCoursePsw = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入选课密码'));
  } else if (value.length !== 6) {
    callback(new Error('选课密码为6位'));
  } else {
    callback();
  }
};