<script lang="ts" setup>
import { ref } from 'vue';
import { useCreateEditor } from './manaco';
import LoadBtn from '@/components/common/LoadBtn.vue';
import { langs, CodeLangs } from '@/utils/option';
import { useDirect, useLoader } from '@/utils/helper';
import { fetchCodeResult } from '@/utils/services';

const refEditorEl = ref();
const { routerBack } = useDirect();
const { isLoading, setIsLoading } = useLoader();
const language = ref(CodeLangs.python);
const { changeLang, getValue } = useCreateEditor({
    refEditorEl,
});
const change = () => changeLang(language.value);

const textarea = ref('');
const run = () => {
    setIsLoading(true);
    fetchCodeResult({
        language: language.value as number,
        code: getValue(),
    }).then((res) => {
        if (res.code === 0) {
            textarea.value =
                res.data?.status === 0
                    ? `运行成功\n${res.data?.description}`
                    : `运行失败。错误原因：${res.data?.title}\n${res.data?.description}`;
        } else {
            textarea.value = `运行失败\n${res.errorMsg}`;
        }
        setIsLoading(false);
    });
};
</script>

<template>
    <div class="ct">
        <div class="ctrls">
            <div class="title">选项</div>
            <el-select v-model="language" placeholder="选择语言" @change="change">
                <el-option
                    v-for="item in langs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <LoadBtn title="运行" :is-loding="isLoading" class="btn" @reload="run" />
            <el-button class="btn" @click="routerBack">返回上一页</el-button>
        </div>
        <div class="editorCt">
            <div id="editor" class="editor" ref="refEditorEl"></div>
            <div class="viewer">
                <div class="viewerTitle">运行结果显示</div>
                <el-input
                    v-model="textarea"
                    type="textarea"
                    placeholder="运行结果显示在此处"
                    readonly
                    resize="none"
                    :input-style="{
                        height: '500px',
                        color: '#5e5e5e',
                    }"
                />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.ct {
    height: calc(100vh - 90px);
    display: flex;
    flex-direction: column;
}
.ctrls {
    flex: 0 0 60px;
    height: 60px;
    background-color: #1e1e1e;
    border-bottom: 2px solid #2e2e2e;
    display: flex;
    align-items: center;

    .title {
        color: #fff;
        border-right: 2px solid #2e2e2e;
        height: 60px;
        width: 64px;
        line-height: 60px;
        margin-right: 20px;
    }

    .btn {
        margin-left: 20px;
    }
}
.editorCt {
    flex: 1;
    display: flex;
    text-align: left; // 全局center
}
.editor {
    height: calc(100vh - 60px - 60px - 30px);
    width: 800px;
    border-right: 2px solid #2e2e2e;
}
.viewer {
    height: 100%;
    flex: 1;
    margin: 10px 20px;
    display: flex;
    flex-direction: column;

    .viewerTitle {
        margin-bottom: 20px;
    }

    .textArea {
        height: 600px;
        color: '#5e5e5e';
    }
}
</style>