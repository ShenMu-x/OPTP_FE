<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import UploadAvatar from '@/components/common/UploadAvatar.vue';
import { courseRules } from './rule';
import { CourseType } from '@/type';
import { comfirm } from '@/utils/helper';

const refEl = ref();
const props = defineProps<{
    type: 'edit' | 'create';
    fetchApi: any;
    data?: CourseType;
}>();

const formLabelWidth = '80px';
const emits = defineEmits(['successCommit']);

const form = reactive({
    courseId: -1,
    courseName: '',
    courseDes: '',
    secretKey: '',
    picUrl: '',
    language: 0,
    needAudit: true,
});

const setForm = () => {
    form.courseId = props.data?.courseId || -1;
    form.courseName = props.data?.courseName || '';
    form.courseDes = props.data?.courseDes || '';
    form.secretKey = props.data?.secretKey || '';
    form.needAudit = props.data?.needAudit ?? true;
    form.picUrl = props.data?.picUrl || '';
    form.language = props.data?.language || 0;
};

props.data && watch(props.data, setForm);
setForm();

const formRules = reactive(courseRules);
const getUrl = (url: string) => {
    form.picUrl = url;
};

// edit / create 传递参数存在courseId差异
const getParams = () => {
    let obj = {
        courseName: form.courseName,
        courseDes: form.courseDes,
        secretkey: form.secretKey,
        picUrl: form.picUrl,
        language: form.language,
        needAudit: form.needAudit,
    };
    if (props.type === 'edit') {
        return Object.assign({ courseId: form.courseId }, obj);
    } else {
        return obj;
    }
};

const commitForm = () => {
    refEl.value.validate((isPass: boolean, obj: any) => {
        if (isPass) {
            comfirm({
                type: 'submit',
                refEl: refEl,
                onSuccTipClose: () => {
                    emits('successCommit');
                },
                fetchApi: props.fetchApi,
                params: getParams(),
            });
        }
    });
};

const resetForm = () => {
    refEl.value.resetFields();
};

defineExpose({
    commitForm,
    resetForm,
});
</script>

<template>
    <el-form :model="form" :rules="formRules" ref="refEl" label-position="left">
        <el-form-item label="课程名称" :label-width="formLabelWidth" prop="courseName">
            <el-input
                v-model="form.courseName"
                autocomplete="off"
                placeholder="请输入课程名称"
            ></el-input>
        </el-form-item>
        <el-form-item label="课程描述" :label-width="formLabelWidth" prop="courseDes">
            <el-input
                v-model="form.courseDes"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 6 }"
                placeholder="请输入课程描述"
                maxlength="200"
                show-word-limit
            ></el-input>
        </el-form-item>
        <el-form-item label="修改密码" :label-width="formLabelWidth" prop="secretKey">
            <el-input
                v-model="form.secretKey"
                autocomplete="off"
                placeholder="请输入修改的课程加入密码（6位）"
            ></el-input>
        </el-form-item>
        <el-form-item label="课程语言" :label-width="formLabelWidth" prop="language">
            <el-radio-group v-model="form.language">
                <el-radio :label="0">Python</el-radio>
                <el-radio :label="1">C++</el-radio>
                <el-radio :label="2">Java</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="课程封面" :label-width="formLabelWidth">
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
</template>
