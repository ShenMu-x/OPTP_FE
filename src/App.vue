<template>
  <router-view></router-view>
</template>

<style lang="less">
@import url('@/styles/var.less');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @main-color;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
