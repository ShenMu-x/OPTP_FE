<script lang="ts" setup>
import BtnBlue from '@/components/common/BtnBlue.vue';
import { showFailWrap, showSuccessWrap } from '@/utils/helper';
import { quitCourse } from '@/utils/services';

const props = defineProps<{
    courseId: number,
}>();
const submit = () => {
    quitCourse({
        courseId: props.courseId
    }).then(res => {
        if (res.code === 0) {
            showSuccessWrap({
                text: '已退出该课程',
                closeCb: () => {
                    location.reload()
                }
            })
        } else {
            showFailWrap({
                text: res.errorMsg ?? '服务器出现问题，请稍后重试'
            })
        }
    })
}

</script>

<template>
    <div class="courseChooseCard">
        <div class="cardTitle">课程操作</div>
        <BtnBlue class="submitBtn" @click="submit">退出课程</BtnBlue>
    </div>
</template>

<style lang="less" scoped>
.courseChooseCard {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    height: 70px;
    background-color: #fff;
}
.submitBtn {
    margin-left: 20px;
}

.cardTitle {
    font-size: 22px;
    margin-bottom: 10px;
}
</style>