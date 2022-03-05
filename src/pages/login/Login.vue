<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Layout from './index.vue';
import { getLoginRule } from './rules';
import { useRedirect } from './logic';
import { login } from '@/utils/services';
import { isTeacher, showFailWrap } from '@/utils/helper';

const refFomeEl = ref();
const user = reactive({
  userName: '',
  password: ''
});

const rules = reactive(getLoginRule())
const { redirect, directTo } = useRedirect();

const loginHandler = () => {
  refFomeEl.value.validate((isPass: boolean, obj: any) => {
    // 通过表单检查
    if (isPass) {
      // 请求登录
      login({ username: user.userName, password: user.password })
        .then(res => {
          if (res.code === 0) {
            isTeacher() ?
              redirect('/teach/user_center') :
              redirect('/user_center')
          } else {
            showFailWrap({ text: res.errorMsg })
          }
        });
    }
  });
};

</script>
<template>
  <Layout>
    <div class="formCt loginFormCt">
      <p class="formTitle">请登录您的账号</p>
      <el-form label-position="top" class="loginForm" :model="user" :rules="rules" ref="refFomeEl">
        <el-form-item label="邮箱" size="large" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" size="large" class="psw" prop="password">
          <span class="textBtnInForm forgetBtn" @click="directTo('/auth')">忘记密码?</span>
          <el-input
            v-model="user.password"
            show-password
            placeholder="请输入密码"
            @keyup.enter="loginHandler"
          ></el-input>
        </el-form-item>
        <el-button
          type="primary"
          class="rectBtnHover loginBtn"
          color="#002D54"
          @click="loginHandler"
        >立即登录</el-button>
        <div class="registerBtnCt">
          还没有账号？
          <span class="textBtnInForm" @click="directTo('/register')">点击注册</span>
        </div>
      </el-form>
    </div>
  </Layout>
</template>

<style lang="less" scoped>
.loginFormCt {
  width: 480px;
  height: 450px;
  padding: 0 46px;
  margin-top: 25px;

  .formTitle {
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
  margin-top: 40px;
  height: 50px;
}
</style>