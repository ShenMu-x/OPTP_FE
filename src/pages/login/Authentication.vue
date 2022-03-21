<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Layout from './index.vue';
import FormCt from './comp/FormCt.vue';
import TextBtn from './comp/TextBtn.vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import TextReturnBtn from '@/components/common/TextReturnBtn.vue';
import { comfirm, useDirect } from '@/utils/helper';
import { changePsw } from '@/utils/services';
import { getAuthRule } from './rules';
import { useCountDownWrap } from './logic';

const refEl = ref();
const form = reactive({
  email: '',
  verificationCode: '',
  password: '',
  passwordCheck: '',
});
const rules = reactive(getAuthRule({
  getPswCheck: () => form.passwordCheck
}))

const { redirect } = useDirect();
const { current, isCounting, fetchCode } = useCountDownWrap();
const getVerificationCode = () => {
  fetchCode(form.email);
};

const registerHandler = () => {
  comfirm({
    type: 'submit',
    refEl,
    onSuccTipClose: () => { redirect('/login') },
    fetchApi: changePsw,
    params: {
      email: form.email,
      password: form.password,
      verificationCode: form.verificationCode
    }
  })
}
</script>
<template>
  <Layout>
    <FormCt class="authCt">
      <TextReturnBtn />
      <p class="formTitle">修改密码</p>
      <el-form label-position="top" ref="refEl" class="auth" :model="form" :rules="rules">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verificationCode">
          <div class="codeInpCt">
            <el-input class="codeInput" placeholder="请输入验证码" v-model="form.verificationCode" />
            <BtnBlue size="large" @click="getVerificationCode" v-show="!isCounting">获取验证码</BtnBlue>
            <el-button type="primary" disabled v-show="isCounting">{{ current }}s后重新获取</el-button>
          </div>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordCheck">
          <el-input v-model="form.passwordCheck" clearable show-password></el-input>
        </el-form-item>
        <BtnBlue size="large" @click="registerHandler" v-show="!isCounting" class="submitBtn">确认修改</BtnBlue>
        <div class="registerBtnCt">
          已有账号？
          <TextBtn @click="redirect('/login')">点击登录</TextBtn>
        </div>
      </el-form>
    </FormCt>
  </Layout>
</template>
<style lang="less" scoped>
.authCt {
  width: 60%;
  padding: 0 30px;
  margin: 25px 0;
  .formTitle {
    font-size: 32px;
    margin-bottom: 20px;
  }
  .auth {
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
.submitBtn {
  width: 100%;
  margin-top: 30px;
}
</style>