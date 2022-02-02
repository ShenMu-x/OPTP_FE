<template>
  <div class="loginCt">
    <div class="title">
        <div class="school">华南师范大学</div>
        <div class="webName">在线编程教学平台</div>
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
  color: #FFFFFF;
  margin-top: 40px;
  .school{
    font-size: 25px;
  }
  .webName{
    font-size: 30px;
  }
}

</style>

<style lang="less">
.textBtnInForm {
  font-size: 14px;
  color: #3F9EFF;
  &:hover {
    cursor: pointer;
    color: #1f88f1;
  }
}

.rectBtnHover {
  border: 0;
  background: #002d54;
  &:hover,&:active,&:focus{
    border: 0;
    background: #335776;
  }
}

.formTitle{
  font-size: 32px;
}

.formCt {
  background: #FFFFFF;
  box-shadow: 0px 0px 15px 0px #504d5f;
  display: flex;
  flex-direction: column;
}
</style>