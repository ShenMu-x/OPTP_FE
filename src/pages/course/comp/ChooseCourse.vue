<script lang="ts" setup>
import { ref } from 'vue';
import { askJoinInCourse } from '@/utils/services';
import { showFailWrap, showSuccessWrap } from '@/utils/helper';

const props = defineProps<{
    courseId: number;
    isClose: boolean;
    needAudit: boolean;
}>();
const key = ref('');

const submit = () => {
    if (key.value === '') {
        showFailWrap({
            text: '选课密码不为空',
        });
    } else {
        askJoinInCourse({
            courseId: props.courseId,
            secretKey: key.value,
        }).then((res) => {
            if (res.code === 0) {
                if (props.needAudit) {
                    showSuccessWrap({ text: '选课申请已发送' });
                } else {
                    showSuccessWrap({
                        text: '选课成功！你已成功加入该课程！',
                        closeCb: () => {
                            window.document.location.reload();
                        },
                    });
                }
            } else {
                showFailWrap({
                    text: res.errorMsg || '服务器出现问题，请稍后重试',
                });
            }
        });
    }
};
</script>

<template>
    <div class="courseChooseCard">
        <div class="cardTitle">自主选课</div>
        <div v-if="props.isClose">本课程已结束，无法选课</div>
        <div class="courseKey" v-else>
            <div class="desc">请输入6位选课密码:</div>
            <el-input
                type="text"
                maxlength="6"
                minlength="6"
                class="pswInput"
                v-model="key"
            ></el-input>
            <el-button class="submitBtn" type="primary" @click="submit">选课</el-button>
        </div>
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

.courseKey {
    width: 60%;
    display: flex;
}

.desc {
    flex: 0 0 145px;
    width: 145px;
    line-height: 40px;
}

.pswInput {
    margin-left: 5px;
    line-height: 1em;
    padding: 0 5px;
}

.submitBtn {
    margin-left: 40px;
}

.cardTitle {
    font-size: 25px;
    margin-bottom: 10px;
}
</style>