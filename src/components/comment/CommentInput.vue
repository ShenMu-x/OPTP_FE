<script lang="ts" setup>
import { ref } from 'vue';
import SumbitBtn from '@/components/common/SumbitBtn.vue';
const props = defineProps<{
    title: string,
    submitComment: (params: any) => void,
    placeHolder?: string,
    blurHandler?: () => void,
    params?: any
}>();
const commentInput = ref('');
const submitWrap = (params : {commentText: string}) => {
    // 合法性判断
    props.submitComment(params);
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
        <div class="inpTitle">
            {{
                props.title
            }}:
        </div>
        <el-form>
            <el-form-item>
                <el-input
                    type="textarea"
                    :placeholder="props.placeHolder ?? '请输入内容'"
                    v-model="commentInput"
                    maxlength="150"
                    show-word-limit
                    rows="5"
                    style="margin-top: 10px"
                ></el-input>
            </el-form-item>
        </el-form>
        <div class="submitBtn">
            <SumbitBtn :postApi="submitWrap" :params="{...props.params, commentText: commentInput}"/>
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