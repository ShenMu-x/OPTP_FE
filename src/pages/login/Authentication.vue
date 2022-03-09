<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { DArrowLeft } from '@element-plus/icons-vue';
import Layout from './index.vue';
import { showSuccessWrap, comfirm, useDirect } from '@/utils/helper';
import { changePsw } from '@/utils/services';
import { getAuthRule } from './rules';
import { useGetCode } from './logic';

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
const { current, isCounting, fetchCode } = useGetCode();
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
    <div class="formCt authCt">
      <el-button
        class="textBtnInForm returnBtn"
        :icon="DArrowLeft"
        @click="redirect('/login')"
        type="text"
      >返回</el-button>
      <p class="formTitle">修改密码</p>
      <el-form label-position="top" ref="refEl" class="auth" :model="form" :rules="rules">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verificationCode">
          <div class="codeInpCt">
            <el-input class="codeInput" placeholder="请输入验证码" v-model="form.verificationCode" />
            <el-button
              class="rectBtnHover"
              color="#002D54"
              type="primary"
              @click="getVerificationCode"
              v-show="!isCounting"
            >获取验证码</el-button>
            <el-button type="primary" disabled v-show="isCounting">{{ current }}s后重新获取</el-button>
          </div>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordCheck">
          <el-input v-model="form.passwordCheck" clearable show-password></el-input>
        </el-form-item>
        <el-button
          type="primary"
          color="#002D54"
          class="rectBtnHover registerBtn"
          @click="registerHandler"
        >确认修改</el-button>
        <div class="registerBtnCt">
          已有账号？
          <span class="textBtnInForm" @click="redirect('./login')">点击登录</span>
        </div>
      </el-form>
    </div>
  </Layout>
</template>
<style lang="less" scoped>
.authCt {
  width: 60%;
  padding: 0 30px;
  margin: 25px 0;

  .formTitle {
    margin-bottom: 20px;
  }

  .auth {
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