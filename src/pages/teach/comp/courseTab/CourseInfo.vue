<script lang="ts" setup>
import { ref } from 'vue';
import CourseForm from '../form/CourseForm.vue';
import { CourseType } from '@/type';
import { ElMessageBox } from 'element-plus';
import { showSuccessWrap, useDirect } from '@/utils/helper';
import { deleteCourse, editCourse } from '@/utils/services';

const { routerBack } = useDirect();
const props = defineProps<{
    course: CourseType;
}>();
const refFormEl = ref();

const editHandler = () => {
    refFormEl?.value?.commitForm();
};

const deleteHandler = () => {
    ElMessageBox.confirm('确定提交？', '实验信息提交确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        lockScroll: false,
    })
        .then(() => {
            deleteCourse({
                courseId: props.course.courseId ?? -1,
            }).then((value: any) => {
                if (value.code === 0) {
                    showSuccessWrap({
                        text: '课程已删除',
                        closeCb: () => {
                            routerBack();
                        },
                    });
                }
            });
        })
        .catch(() => {
            // 取消删除
        });
};
</script>

<template>
    <div class="editFormCt">
        <CourseForm
            ref="refFormEl"
            type="edit"
            :fetchApi="editCourse"
            :data="props.course"
        />
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