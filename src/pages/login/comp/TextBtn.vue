<template>
    <el-button
        class="textBtn"
        type="text"
    >
        <slot></slot>
    </el-button>
</template>

<style lang="less" scoped>
.textBtn {
    font-size: 14px;
    color: #3f9eff;
    &:hover {
        cursor: pointer;
        color: #1f88f1;
    }
}
</style>