<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
    title: string,
    submitComment: any,
    placeHolder?: string,
}>();
const commentInput = ref('');

const submit = () => {
    props.submitComment({ commentText: commentInput.value })
}
const resetInput = () => {
    commentInput.value = '';
}

defineExpose({
    resetInput,
})

</script>

<template>
    <div class="commentInpCt">
        <div class="inpTitle">{{ props.title }}:</div>
        <el-form>
            <el-form-item>
                <el-input
                    type="textarea"
                    :placeholder="props.placeHolder || '请输入内容'"
                    v-model="commentInput"
                    maxlength="150"
                    show-word-limit
                    rows="5"
                    style="margin-top: 10px"
                ></el-input>
            </el-form-item>
        </el-form>
        <div class="submitBtn">
            <el-button type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<style lang="less" scoped>
.commentInpCt {
    padding-bottom: 40px;
    position: relative;
    .inpTitle {
        height: 36px;
        line-height: 36px;
        font-size: 18px;
        text-align: left;
    }

    .submitBtn {
        position: absolute;
        right: 0;
    }

    .textArea {
        width: 100%;
    }
}
</style>