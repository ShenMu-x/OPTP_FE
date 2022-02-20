<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { DArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import Layout from './index.vue';
import getRules from './formRules';
import { stuRegister, getCode } from '@/utils/services';
import { showFailWrap, showSuccessWrap } from '@/utils/helper';

const router = useRouter();
const refFormEl = ref();
const isGettingCode = ref(false);
const count = ref(60);
let interval: any = null;

const registerModel = reactive({
  role: 0,
  email: '',
  verificationCode: '',
  userName: '',
  uid: '',
  major: '',
  organization: '',
  password: '',
  passwordCheck: '',
  gender: 0,
});

const rules = reactive(getRules({
  pswCheck: registerModel.password,
}))

const redirect = (url: string) => {
  router.replace(url);
};

const changeRole = (role: number) => {
  // 根据用户身份切换表单
  console.log(role);
}

const clickGetCode = () => {
  // 倒计时
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

  // 请求验证码
  getCode({ email: registerModel.email }).then(value => {
    if (value.code === 0) showSuccessWrap({ text: '验证码已发送' })
    else showFailWrap({ text: value.error?.message })
  })
};

const registerHandler = () => {
  refFormEl.value.validate((isPass: boolean, obj: any) => {
    if (isPass) {
      stuRegister({
        email: registerModel.email,
        realName: registerModel.userName,
        num: registerModel.uid,
        gender: registerModel.gender,
        password: registerModel.password,
        major: registerModel.major,
        organization: registerModel.organization,
        verificationCode: registerModel.verificationCode,
      }).then(value => {
        if (value.code === 0) {
          showSuccessWrap({ text: '注册成功！ 请登录。' })
          router.replace('/login');
        }
      })
    }
  })
}

</script>

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
      <el-form
        label-position="top"
        class="registerForm"
        :model="registerModel"
        ref="refFormEl"
        :rules="rules"
      >
        <el-form-item label="身份">
          <el-radio-group v-model="registerModel.role" size="large" @change="changeRole">
            <el-radio :label="0" border>我是学生</el-radio>
            <el-radio :label="1" border>我是老师</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerModel.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verificationCode">
          <div class="codeInpCt">
            <el-input
              class="codeInput"
              placeholder="请输入6位验证码"
              v-model="registerModel.verificationCode"
            />
            <el-button
              class="rectBtnHover"
              color="#002D54"
              type="primary"
              @click="clickGetCode"
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
        <el-form-item label="性别">
          <el-radio-group v-model="registerModel.gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-button
          type="primary"
          color="#002D54"
          class="rectBtnHover registerBtn"
          @click="registerHandler"
        >点击注册</el-button>
        <div class="registerBtnCt">
          已有账号？
          <span class="textBtnInForm" @click="redirect('/login')">点击登录</span>
        </div>
      </el-form>
    </div>
  </Layout>
</template>



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