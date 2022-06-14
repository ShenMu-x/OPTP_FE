<script lang="ts" setup>
import { InfoFilled } from '@element-plus/icons-vue';
</script>

<template>
    <div class="formTip">
        <div class="iconWrap">
            <InfoFilled style="height: 1em; width: 1em; color: #606266; flex: 0 0 1em" />
        </div>
        <p class="tipText">
            <slot name="tipinfo"></slot>
        </p>
    </div>
</template>

<style lang="less" scoped>
@import url('@/styles/var.less');
.formTip {
    display: flex;
    padding: 8px 16px;
    text-align: left;
    background-color: #ebebeb;
    border-radius: 4px;
    border-left: 6px solid @main-color;
    margin-bottom: 20px;
    .iconWrap {
        height: 18px; // element line-height
        display: flex;
        align-items: center;
    }
    .tipText {
        margin-left: 4px;
    }
}
</style>