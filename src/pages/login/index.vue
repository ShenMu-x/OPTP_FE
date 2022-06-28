<template>
    <div class="loginCt">
        <div class="title">
            <div>华南师范大学</div>
            <div>在线编程教学平台</div>
        </div>
        <slot></slot>
    </div>
</template>

<style lang="less" scoped>
.loginCt {
    width: 100%;
    min-height: 100%;
    background: #002d54;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.title {
    color: #ffffff;
    margin-top: 30px;
    font-size: 30px;
}
</style>