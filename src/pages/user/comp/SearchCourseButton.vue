<script lang="ts" setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { showFailWrap } from '@/utils/helper';

const keyword = ref("");
const search = () => {
    if (keyword.value === "") showFailWrap({ text: "请输入课程名称" })
    else emits('search', keyword.value);
}
const cancel = () => {
    keyword.value = "";
    emits('cancel');
}

const emits = defineEmits(['search', 'cancel']);
</script>

<template>
    <div class="btnCt">
        <el-input v-model.trim="keyword" size="large" placeholder="输入课程名称查询" :prefix-icon="Search"></el-input>
        <el-button class="searchBtn" @click="search">查询</el-button>
        <el-button @click="cancel">取消</el-button>
    </div>
</template>

<style lang="less" scoped>
.searchBtn {
    margin-left: 20px;
}
.btnCt {
    display: flex;
    width: 400px;
}
</style>