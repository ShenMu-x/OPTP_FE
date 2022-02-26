<script lang="ts" setup>
import { labType } from '@/type';
import LabForm from '../form/LabForm.vue';

const props = defineProps<{
    data: labType
}>();

const editHandler = () => {

}

const deleteHandler = () => {

}
</script>

<template>
    <LabForm :data="props.data" />
    <div class="btnCt">
        <el-button color="#002D54" type="primary" @click="editHandler">确认修改</el-button>
        <el-button type="danger" @click="deleteHandler">删除实验</el-button>
    </div>
</template>

<style lang="less" scoped>
.btnCt {
    margin-top: -10px;
    margin-bottom: 40px;
}
</style>