<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CourseForm from '../form/CourseForm.vue';
import { CourseType } from '@/type';
import { ElMessageBox } from 'element-plus';
import { showSuccessWrap } from '@/utils/helper';
import { deleteCourse, editCourse } from '@/utils/services';

const router = useRouter();
const props = defineProps<{
    course: CourseType
}>();
const refFormEl = ref();

const editHandler = () => {

}

const deleteHandler = () => {
    ElMessageBox.confirm(
        '确定提交？',
        '实验信息提交确认',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success',
            lockScroll: false,
        }
    )
        .then(() => {
            deleteCourse({
                courseId: props.course.courseId ?? -1
            }).then((value: any) => {
                if (value.code === 0) {
                    showSuccessWrap({
                        text: '课程已删除',
                        closeCb: () => { router.back() }
                    })
                }
            })

        })
        .catch(() => {
            // 取消删除
        })

}

</script>

<template>
    <div class="editFormCt">
        <CourseForm ref="refFormEl" :fetchApi="editCourse" :data="props.course" />
    </div>
    <div class="btnCt">
        <el-button color="#002D54" type="primary" @click="editHandler">信息修改确认</el-button>
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