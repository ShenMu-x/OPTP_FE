<template>
    <div class="commentInpCt">
        <div class="inpTitle">
            {{
                props.title
            }}:
        </div>
        <el-form>
            <el-form-item>
                <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="commentInput"
                    maxlength="150"
                    show-word-limit
                    rows="5"
                    style="margin-top: 10px"
                ></el-input>
            </el-form-item>
        </el-form>
        <div class="submitBtn">
            <el-button type="primary" @click="submitWrap">提交</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps<{
    title: string,
    submitComment: (comment: string) => void
}>();
const commentInput = ref('');
const submitWrap = () => {
    // 合法性判断
    props.submitComment(commentInput.value)
}
</script>

<style lang="less" scoped>
.commentInpCt {
    margin: 20px;
    padding-bottom: 60px;
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