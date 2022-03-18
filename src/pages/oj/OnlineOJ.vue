<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useCreateEditor } from './manaco';
import { langs, CodeLangs } from '@/utils/option';

const refEditorEl = ref();

const language = ref(CodeLangs.Python);
const { changeLang } = useCreateEditor({
    refEditorEl,
})
const change = () => {
    console.log('change', language.value)
    changeLang(language.value)
}

const textarea = ref('采用websocket实现通信');
// 后台建立wss链接
// 前端控制代码格式化，静态语法检查，语义化提示

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
            <el-button class="btn">查看实验内容</el-button>
            <el-button class="btn">运行</el-button>
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
                        height: '100%',
                        color: '#5e5e5e'
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
    height: 100%;
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
}
</style>