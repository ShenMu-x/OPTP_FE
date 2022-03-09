<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { DArrowLeft } from '@element-plus/icons-vue';
import Layout from './index.vue';
import { getRegisterRule } from './rules';
import { stuRegister, teachRegister } from '@/utils/services';
import { showFailWrap, showSuccessWrap, useCountDownSec, useDirect } from '@/utils/helper';
import { useGetCode } from './logic'

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

const { redirect } = useDirect();
const { current, isCounting, fetchCode } = useGetCode();
const getCode = () => {
  fetchCode(model.email)
};

// 用户身份类型切换
let register = stuRegister;
const changeRole = () => {
  register = model.role === 1 ? teachRegister : stuRegister;
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
          redirect('/login');
        }
      })
    }
  })
}

</script>

<template>
  <Layout>
    <div class="formCt formCt">
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
        :model="model"
        ref="refFormEl"
        :rules="rules"
      >
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
            <el-button
              class="rectBtnHover"
              color="#002D54"
              type="primary"
              @click="getCode"
              v-show="!isCounting"
            >获取验证码</el-button>
            <el-button type="primary" disabled v-show="isCounting">{{ current }}s后重新获取</el-button>
          </div>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="model.realName" clearable></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="num">
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
.formCt {
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