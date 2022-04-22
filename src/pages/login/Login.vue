<script lang="ts" setup>
import { reactive, ref } from 'vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import Layout from './index.vue';
import FormCt from './comp/FormCt.vue';
import TextBtn from './comp/TextBtn.vue';
import { login } from '@/utils/services';
import { showFailWrap, useDirect } from '@/utils/helper';
import { getLoginRule } from './rules';

const refFomeEl = ref();
const form = reactive({
  userName: '',
  password: ''
});

const rules = reactive(getLoginRule())
const { routerToRegister, routerToForgetPassword, routerToHome } = useDirect();
const directToForgetPassword = () => routerToForgetPassword('direct')
const directToRegister = () => routerToRegister('direct')
const loginHandler = () => {
  refFomeEl.value.validate((isPass: boolean) => {
    // 通过表单检查
    if (isPass) {
      // 请求登录
      login({ username: form.userName, password: form.password })
        .then(res => {
          if (res.code === 0) routerToHome('redirect')
          else showFailWrap({ text: res.errorMsg })
        });
    }
  });
};

</script>
<template>
  <Layout>
    <FormCt class="loginFormCt">
      <p class="formTitle">请登录您的账号</p>
      <el-form label-position="top" class="loginForm" :model="form" :rules="rules" ref="refFomeEl">
        <el-form-item label="邮箱" size="large" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" size="large" class="psw" prop="password">
          <TextBtn @click="directToForgetPassword" class="forgetBtn">忘记密码</TextBtn>
          <el-input v-model="form.password" show-password placeholder="请输入密码" @keyup.enter="loginHandler"></el-input>
        </el-form-item>
        <BtnBlue size="large" @click="loginHandler" class="loginBtn">立即登录</BtnBlue>
        <div class="registerBtnCt">
          还没有账号？
          <TextBtn @click="directToRegister">点击注册</TextBtn>
        </div>
      </el-form>
    </FormCt>
  </Layout>
</template>

<style lang="less" scoped>
.loginFormCt {
  width: 480px;
  height: 450px;
  padding: 0 46px;
  margin-top: 25px;

  .formTitle {
    font-size: 32px;
    margin-top: 25px;
  }
}

.loginForm {
  margin-top: 25px;
}

.psw {
  position: relative;
}

.forgetBtn {
  position: absolute;
  line-height: 22px;
  top: -34px;
  right: 0;
}

.registerBtnCt {
  font-size: 14px;
  margin-top: 10px;
  float: right;
}

.loginBtn {
  width: 100%;
  margin-top: 30px;
}
</style>