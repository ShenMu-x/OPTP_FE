<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import Layout from './index.vue';
import { useRouter } from 'vue-router';
import { loginApi } from '@/utils/services';
import { mockStuInfo } from './mock';

const router = useRouter();
const refFomeEl = ref();

const user = reactive({
  userName: mockStuInfo.username,
  password: mockStuInfo.password
});

const rules = reactive({
  userName: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur',
    },
    {
      pattern: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$',
      message: '请输入正确格式的邮箱',
      trigger: 'blur'
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ]
})

const loginHandler = () => {
  refFomeEl.value.validate((isPass: boolean, obj: any) => {
    if (isPass) {
      loginApi({ username: user.userName, password: user.password })
        .then(value => {
          if (value.statusCode === 0) {
            // router.replace('./usercenter');
            router.replace('./teaccenter');
          } else {
            ElMessage({
              showClose: false,
              message: value.data.message,
              type: 'error',
              duration: 2000,
            })
          }
          console.log(value);
        });
    } 
  });

};

const toRegister = () => {
  router.push('./register');
};

const toAuthentication = () => {
  router.push('./authentication');
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