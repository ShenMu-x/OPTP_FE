<script lang="ts" setup>
import { ref } from 'vue-demi';
import { askJoinInCourse } from '@/utils/services';
import { showFailWrap, showSuccessWrap } from '@/utils/helper';

const props = defineProps<{
    courseId: number,
    secret: string,
}>();
const inp = ref('');

const submit = () => {
    if (inp.value !== props.secret) {
        showFailWrap({
            text: '选课密码不正确'
        })
    } else {
        askJoinInCourse({
            courseId: props.courseId,
            secretKey: props.secret
        }).then(res => {
            if (res.code === 0) {
                showSuccessWrap({
                    text: '选课申请已发送'
                })
            } else {
                showFailWrap({
                    text: res.errorMsg || '服务器出现问题，请稍后重试'
                })
            }
        })
    }
}

</script>

<template>
    <div class="courseChooseCard">
        <div class="cardTitle">自主选课</div>
        <div class="coursePsw">
            请输入6位选课密码:
            <input type="text" maxlength="6" minlength="6" class="pswInput" v-model="inp" />
        </div>
        <el-button class="submitBtn" type="primary" @click="submit">选课</el-button>
    </div>
</template>

<style lang="less" scoped>
.courseChooseCard {
    margin: 20px 0;
    padding: 20px;
    height: 140px;
    background-color: #fff;
    text-align: left;
}

.pswInput {
    margin-left: 10px;
    line-height: 1em;
    padding: 0 5px;
}

.submitBtn {
    float: right;
    margin-right: 20px;
}

.cardTitle {
    font-size: 25px;
    margin-bottom: 10px;
}
</style>