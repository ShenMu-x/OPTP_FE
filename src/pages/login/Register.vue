<template>
  <Layout>
    <div class="formCt registerFormCt">
      <el-button
        class="textBtnInForm returnBtn"
        :icon="DArrowLeft"
        @click="redirect('/login')"
        type="text"
      >返回</el-button>
      <p class="formTitle">用户注册</p>
      <el-form label-position="top" class="registerForm" :model="registerModel" :rules="rules">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerModel.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verificationCode">
          <div class="codeInpCt">
            <el-input
              class="codeInput"
              placeholder="请输入验证码"
              v-model="registerModel.verificationCode"
            />
            <el-button
              class="rectBtnHover"
              type="primary"
              @click="getVerificationCode"
              v-show="!isGettingCode"
            >获取验证码</el-button>
            <el-button type="primary" disabled v-show="isGettingCode">{{ count }}s后重新获取</el-button>
          </div>
        </el-form-item>
        <el-form-item label="真实姓名" prop="userName">
          <el-input v-model="registerModel.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="num">
          <el-input v-model="registerModel.uid" clearable></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="registerModel.major" clearable></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="organization">
          <el-input v-model="registerModel.organization" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerModel.password" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordCheck">
          <el-input v-model="registerModel.passwordCheck" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="性别" class="flex justify-start">
          <el-radio-group v-model="registerModel.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-button type="primary" class="rectBtnHover registerBtn" @click="registerHandler">点击注册</el-button>
        <div class="registerBtnCt">
          已有账号？
          <span class="textBtnInForm" @click="redirect('/login')">点击登录</span>
        </div>
      </el-form>
    </div>
  </Layout>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Layout from './index.vue';
import { DArrowLeft } from '@element-plus/icons-vue';
import { validateEmail } from '../../utils/helper/validate';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
const router = useRouter();
const isGettingCode = ref(false);
const count = ref(2);
let interval: any = null;
const registerModel = reactive({
  email: '',
  verificationCode: '',
  userName: '',
  uid: '',
  major: '',
  organization: '',
  password: '',
  passwordCheck: '',
  sex: '',
});

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerModel.password) {
    callback(new Error("密码确认错误"))
  } else {
    callback()
  }
};

const rules = reactive({
  email: [
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
    {
      validator: validateEmail,
      trigger: 'blur'
    }
  ],
  verificationCode: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur',
    },
    {
      min: 4,
      max: 4,
      message: '请输入4位验证码',
      trigger: 'blur',
    },
  ],
  userName: [
    {
      required: true,
      message: '请输入真实姓名',
      trigger: 'blur',
    },
  ],
  major: [
    {
      required: true,
      message: '请输入专业名称',
      trigger: 'blur',
    },
  ],
  uid: [
    {
      required: true,
      message: '请输入学号',
      trigger: 'blur',
    },
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
      validator: validatePass,
      trigger: 'blur'
    }
  ],
})

const redirect = (url: string) => {
  router.replace(url);
};

const getVerificationCode = () => {
  console.log('xh--> get code');
  isGettingCode.value = true;
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  interval = setInterval(() => {
    count.value--;
    if (count.value <= 0) {
      clearInterval(interval);
      interval = null;
      isGettingCode.value = false;
      count.value = 60;
    }
  }, 1000);
};

const registerHandler = () => {
  console.log('xh--> register', registerModel.email);
  ElMessage({
    message: '注册成功！ 请登录。',
    type: 'success',
    duration: 1000
  });

}





</script>

<style lang="less" scoped>
.registerFormCt {
  width: 60%;
  padding: 0 30px;
  margin: 25px 0;

  .formTitle {
    margin-bottom: 20px;
  }

  .registerForm {
    margin-bottom: 30px;
  }
}

.returnBtn {
  margin-top: 20px;
  font-size: 20px;
  justify-self: flex-start;
  width: fit-content;
}

.loginForm {
  margin-top: 25px;
}
.psw {
  position: relative;
}

.codeInpCt {
  display: flex;
  width: 100%;

  .codeInput {
    flex: 1;
    margin-right: 40px;
  }
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

.registerBtn {
  width: 100%;
  margin-top: 40px;
  height: 50px;
}
</style>