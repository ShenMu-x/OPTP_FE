<script lang="ts" setup>
import { reactive, ref } from 'vue';
import UploadAvatar from '@/components/common/UploadAvatar.vue';
import CourseCreateForm from './CourseCreateForm.vue';

const model = reactive({
    avatar: ''
})

const rules = {

}


</script>

<template>
    <CourseCreateForm :closeDialog="()=>{}" />
</template>