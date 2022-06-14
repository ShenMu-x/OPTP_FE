<template>
    <el-button class="textBtn" type="text">
        <slot></slot>
    </el-button>
</template>

<style lang="less" scoped>
@import url('@/styles/var.less');
.textBtn {
    font-size: 14px;
    color: @text-button-primary-color;
    &:hover {
        cursor: pointer;
        color: @text-button-primary-hover-color;
    }
}
</style>