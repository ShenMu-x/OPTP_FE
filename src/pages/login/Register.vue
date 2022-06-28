<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Layout from './index.vue';
import FormCt from './comp/FormCt.vue';
import TextBtn from './comp/TextBtn.vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import TextReturnBtn from '@/components/common/TextReturnBtn.vue';
import { registerStudentAccount, registerTeacherAccount } from '@/utils/services';
import { showFailWrap, showSuccessWrap, useDirect } from '@/utils/helper';
import { getRegisterRule } from './rules';
import { useCountDownWrap } from './logic'

const refFormEl = ref();
const model = reactive({
  role: 0,
  email: '',
  verificationCode: '',
  realName: '',
  num: '',
  major: '',
  organization: '',
  password: '',
  passwordCheck: '',
  gender: 0,
});
const rules = reactive(getRegisterRule({
  pswCheck: () => { return model.password }
}))

const { routerToLogin } = useDirect();
const redirectLogin = () => routerToLogin('redirect');
const { current, isCounting, fetchCode } = useCountDownWrap();
const getCode = () => fetchCode(model.email)

// 用户身份类型切换
let register = registerStudentAccount;
const changeRole = () => {
  register = model.role === 1 ? registerTeacherAccount : registerStudentAccount;
}

const registerHandler = () => {
  refFormEl.value.validate((isPass: boolean, obj: any) => {
    if (isPass) {
      register({
        email: model.email,
        realName: model.realName,
        num: model.num,
        gender: model.gender,
        password: model.password,
        major: model.major,
        organization: model.organization,
        verificationCode: model.verificationCode,
      }).then(value => {
        if (value.code === 0) {
          showSuccessWrap({ text: '注册成功！ 请登录。' })
          redirectLogin();
        } else {
          showFailWrap({ text: value.errorMsg })
        }
      })
    }
  })
}

</script>

<template>
  <Layout>
    <FormCt class="RegisterFormCt">
      <TextReturnBtn />
      <p class="formTitle">用户注册</p>
      <el-form label-position="top" class="registerForm" :model="model" ref="refFormEl" :rules="rules">
        <el-form-item label="身份">
          <el-radio-group v-model="model.role" size="large" @change="changeRole">
            <el-radio :label="0" border>我是学生</el-radio>
            <el-radio :label="1" border>我是老师</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="model.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verificationCode">
          <div class="codeInpCt">
            <el-input class="codeInput" placeholder="请输入6位验证码" v-model="model.verificationCode" />
            <BtnBlue size="large" @click="getCode" v-show="!isCounting">获取验证码</BtnBlue>
            <el-button type="primary" disabled v-show="isCounting">{{ current }}s后重新获取</el-button>
          </div>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="model.realName" clearable></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="num">
          <el-input v-model="model.num" clearable></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="model.major" clearable></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="organization">
          <el-input v-model="model.organization" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="model.password" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordCheck">
          <el-input v-model="model.passwordCheck" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="model.gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <BtnBlue size="large" @click="registerHandler" class="registerBtn">点击注册</BtnBlue>
        <div class="registerBtnCt">
          已有账号？
          <TextBtn @click="redirectLogin">点击登录</TextBtn>
        </div>
      </el-form>
    </FormCt>
  </Layout>
</template>
<style lang="less" scoped>
.RegisterFormCt {
  width: 60%;
  padding: 0 30px;
  margin: 25px 0;

  .formTitle {
    font-size: 32px;
    margin-bottom: 20px;
  }

  .registerForm {
    margin-bottom: 30px;
  }
}

.codeInpCt {
  display: flex;
  width: 100%;

  .codeInput {
    flex: 1;
    margin-right: 40px;
  }
}

.registerBtnCt {
  font-size: 14px;
  margin-top: 10px;
  float: right;
}

.registerBtn {
  width: 100%;
  margin-top: 30px;
}
</style>