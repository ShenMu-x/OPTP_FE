<script lang="ts" setup>
import { ref } from 'vue-demi';
import SumbitBtn from '@/components/common/SumbitBtn.vue';
const coursePswInput = ref('');

// 选课 courseId secretKey

</script>

<template>
    <div class="courseChooseCard">
        <div class="cardTitle">自主选课</div>
        <div class="coursePsw">
            请输入6位选课密码:
            <input
                type="text"
                maxlength="6"
                minlength="6"
                class="pswInput"
                v-model="coursePswInput"
            />
        </div>
        <SumbitBtn class="submitBtn" title="选课" />
    </div>
</template>

<style lang="less" scoped>
.courseChooseCard {
    margin: 20px 0;
    padding: 20px;
    height: 140px;
    background-color: #fff;
    text-align: left;

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
}
</style>