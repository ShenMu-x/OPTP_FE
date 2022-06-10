<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Layout from './index.vue';
import FormCt from './comp/FormCt.vue';
import TextBtn from './comp/TextBtn.vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import { comfirm, showFailWrap, useDirect } from '@/utils/helper';
import { changePassword } from '@/utils/services';
import { getAuthRule } from './rules';
import { useCountDownWrap } from './logic';

const refEl = ref();
const form = reactive<{
    number: string;
    verificationCode: string;
    password: string;
    passwordCheck: string;
}>({
    number: '',
    verificationCode: '',
    password: '',
    passwordCheck: '',
});
const rules = reactive(getAuthRule({ getPasswordFirstInput: () => form.password }));

const { routerToLogin } = useDirect();
const redirectToLogin = () => routerToLogin('redirect');
const { current, isCounting, fetchCode, isLoading } = useCountDownWrap();
const requestVerificationCode = () => {
    if (form.number.trim().length === 0) showFailWrap({ text: '请先填写学号' });
    else fetchCode(form.number);
};

const registerHandler = () => {
    comfirm({
        type: 'submit',
        refEl,
        onSuccTipClose: redirectToLogin,
        fetchApi: changePassword,
        params: {
            number: form.number,
            password: form.password,
            verificationCode: form.verificationCode,
        },
    });
};
</script>
<template>
    <Layout>
        <FormCt class="authCt">
            <p class="formTitle">修改密码</p>
            <el-form label-position="top" ref="refEl" class="auth" :model="form" :rules="rules">
                <el-form-item label="学号" prop="number">
                    <el-input v-model="form.number" clearable></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="verificationCode">
                    <div class="codeInpCt">
                        <el-input
                            class="codeInput"
                            placeholder="请输入验证码"
                            v-model="form.verificationCode"
                        />
                        <BtnBlue
                            size="large"
                            @click="requestVerificationCode"
                            :disabled="isLoading || isCounting"
                        >
                            {{ isCounting ? `${current}秒后重新获取` : '获取验证码' }}
                        </BtnBlue>
                    </div>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" clearable show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="passwordCheck">
                    <el-input v-model="form.passwordCheck" clearable show-password></el-input>
                </el-form-item>
                <BtnBlue size="large" @click="registerHandler" class="submitBtn">确认修改</BtnBlue>
                <div class="registerBtnCt">
                    已有账号？
                    <TextBtn @click="redirectToLogin">返回登录</TextBtn>
                </div>
            </el-form>
        </FormCt>
    </Layout>
</template>
<style lang="less" scoped>
.authCt {
    width: 60%;
    padding: 0 30px;
    margin: 25px 0 15px;

    .formTitle {
        font-size: 32px;
        margin: 15px 0;
    }

    .auth {
        margin-bottom: 10px;
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
}
</style>