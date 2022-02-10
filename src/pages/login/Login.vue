<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import Layout from './index.vue';
import { useRouter } from 'vue-router';
import { login } from '@/utils/services';
import { mockStuInfo } from './mock';

const router = useRouter();

const user = reactive({
  name: '',
  password: ''
});

const loginHandler = () => {
  login({ username: user.name, password: user.password });
};

const toRegister = () => {
  console.log('xh--> register');
  router.push('./register');
};

const toAuthentication = () => {
  console.log('xh--> toAuthentication');
  router.push('./authentication');
};

</script>

<template>
  <Layout>
    <div class="formCt loginFormCt">
      <p class="formTitle">请登录您的账号</p>
      <el-form label-position="top" class="loginForm" :model="user">
        <el-form-item label="邮箱" size="large">
          <el-input v-model="user.name" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" size="large" class="psw">
          <span class="textBtnInForm forgetBtn" @click="toAuthentication">忘记密码?</span>
          <el-input
            v-model="user.password"
            show-password
            placeholder="请输入密码"
            @keyup.enter="loginHandler"
          ></el-input>
        </el-form-item>
        <el-button type="primary" class="rectBtnHover loginBtn" @click="loginHandler">立即登录</el-button>
        <div class="registerBtnCt">
          还没有账号？
          <span class="textBtnInForm" @click="toRegister">点击注册</span>
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