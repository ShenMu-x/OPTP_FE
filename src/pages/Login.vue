
<script lang="ts" setup>
import { ref, reactive } from 'vue'
const userInfo  = reactive({
  id: '',
  password: ''
})
const labelPosition = ref('right')
</script>

<template>
      <div class="formCt">
        <h2>登录</h2>
        <el-form ref="formRef" :model="userInfo" label-width="120px" label-position="left">
        <el-form-item label="学号/职工号" class="line">
          <el-input class="inp" v-model="userInfo.id" placeholder="请输入学号/职工号"></el-input>
        </el-form-item>
        <el-form-item label="登录密码"  class="line">
          <el-input
            class="inp"
            v-model="userInfo.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
       </el-form>
      </div>

</template>



<style lang="less" scoped>
  .formCt{
    position: absolute;
    right: 100px;
    height: 400px;
    width: 500px;
    padding: 20px;
    top: calc(50vh - 200px);
    background-color: #f0f3f7;
    border-radius: 5px;
  }
    
</style>