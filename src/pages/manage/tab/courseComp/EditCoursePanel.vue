<script lang="ts" setup>
import { ref, reactive, toRef, watch } from 'vue';
import UploadAvatar from '@/components/common/UploadAvatar.vue';
import { comfirm, useDialog } from '@/utils/helper';
import { editCourseInfo, manageCourseType } from '@/utils/services';
import { emptyCourse } from '../default';
import { getCourseRule } from '../rules';

const { isDialogOpen, openDialog, closeDialog } = useDialog();
const refEl = ref();
const labelWidth = '80px';
const props = defineProps<{ course: manageCourseType }>();
const course = toRef(props, 'course');
const rules = ref(getCourseRule());
const form = reactive({ ...emptyCourse });
const refreshInfo = () => {
    form.courseId = course.value.courseId;
    form.name = course.value.name;
    form.description = course.value.description;
    form.secretKey = course.value?.secretKey;
    form.picUrl = course.value?.picUrl;
    form.isClosed = course.value?.isClosed;
    form.needAudit = course.value?.needAudit;
};
watch(course, (newV, oldV) => {
    if (newV.courseId !== oldV.courseId) refreshInfo();
});
const emits = defineEmits(['submit']);
const getUrl = (url: string) => {
    form.picUrl = url;
};
const submit = () => {
    comfirm({
        type: 'edit',
        refEl,
        successCb: () => {
            emits('submit');
        },
        finallyCb: closeDialog,
        fetchApi: editCourseInfo,
        params: {
            course_id: form.courseId,
            name: form.name,
            description: form.description,
            secret_key: form.secretKey,
            pic_url: form.picUrl,
            is_closed: form.isClosed,
            need_aduit: form.needAudit,
        },
    });
};
const cancle = () => {
    refEl?.value?.resetFields?.();
    closeDialog();
};
defineExpose({
    openPanel: openDialog,
});
</script>

<template>
    <el-dialog v-model="isDialogOpen" title="修改课程信息">
        <el-form :model="form" ref="refEl" :rules="rules">
            <el-form-item label="课程名称" :label-width="labelWidth" prop="name">
                <el-input v-model="form.name" placeholder="请输入课程名称"></el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="labelWidth" prop="description">
                <el-input v-model="form.description" placeholder="请输入课程描述"></el-input>
            </el-form-item>
            <el-form-item label="状态" :label-width="labelWidth" required>
                <el-radio-group v-model="form.isClosed">
                    <el-radio :label="true">已关闭</el-radio>
                    <el-radio :label="false">进行中</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="选课密码" prop="secretKey" :label-width="labelWidth">
                <el-input v-model="form.secretKey" :maxlength="6" :minlength="6"></el-input>
            </el-form-item>
            <el-form-item label="头像" :label-width="labelWidth">
                <UploadAvatar :after-upload="getUrl" :avatarUrl="form.picUrl" />
            </el-form-item>
            <el-form-item label="是否需要对选课学生进行审核" label-width="230px">
                <el-switch
                    v-model="form.needAudit"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                    active-text="是"
                    inactive-text="否"
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancle">取消</el-button>
                <el-button type="primary" @click="submit">提交</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="less" scoped>
</style>