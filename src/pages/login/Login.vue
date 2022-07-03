<script lang="ts" setup>
import { reactive, ref } from 'vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import Layout from './index.vue';
import FormCt from './comp/FormCt.vue';
import { login as loginApi } from '@/utils/services';
import { showFailWrap, useDirect } from '@/utils/helper';
import { getLoginRule } from './rules';

const refFomeEl = ref();
const form = reactive({
    userName: '',
    password: '',
});

const rules = reactive(getLoginRule());
const labelWidth = ref('70px');
const { routerToHome } = useDirect();
const loginHandler = () => {
    refFomeEl.value.validate((isPass: boolean) => {
        if (isPass) {
            loginApi({ username: form.userName, password: form.password }).then((res) => {
                if (res.code === 0) routerToHome('redirect');
                else showFailWrap({ text: res.errorMsg });
            });
        }
    });
};
</script>
<template>
    <Layout>
        <FormCt class="loginFormCt">
            <p class="formTitle">请登录您的账号</p>
            <el-form
                label-position="top"
                class="loginForm"
                :model="form"
                :rules="rules"
                ref="refFomeEl"
            >
                <el-form-item label="账号" size="large" prop="userName" :label-width="labelWidth">
                    <el-input v-model="form.userName" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item
                    label="密码"
                    size="large"
                    class="psw"
                    prop="password"
                    :label-width="labelWidth"
                >
                    <el-input
                        v-model="form.password"
                        show-password
                        placeholder="请输入密码"
                        @keyup.enter="loginHandler"
                    ></el-input>
                </el-form-item>
                <BtnBlue size="large" @click="loginHandler" class="loginBtn">立即登录</BtnBlue>
            </el-form>
        </FormCt>
    </Layout>
</template>

<style lang="less" scoped>
@import url('@/styles/var.less');
.loginFormCt {
    width: 480px;
    padding: 30px 46px;
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

.loginBtn {
    width: 100%;
    margin: 30px 0 10px;
}
</style>
