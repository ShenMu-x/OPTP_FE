<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CourseForm from '../form/CourseForm.vue'
import { editCourse } from '@/utils/services/course';
import { mockCourse } from './mock'

const router = useRouter();
const refFormEl = ref();

const editHandler = () => {

}

const deleteHandler = () => {
    router.go(-1);
}

</script>

<template>
    <div class="editFormCt">
        <CourseForm ref="refFormEl" :fetchApi="editCourse" :data="mockCourse" />
    </div>
    <div class="btnCt">
        <el-button color="#002D54" type="primary" @click="editHandler">确认修改</el-button>
        <el-button type="danger" @click="deleteHandler">删除课程</el-button>
    </div>
</template>

<style lang="less" scoped>
.editFormCt {
    margin: 40px;
}

.btnCt {
    margin-bottom: 40px;
}
</style>