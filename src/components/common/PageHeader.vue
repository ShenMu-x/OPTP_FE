<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1)
}

const props = defineProps<{
    content: string
}>()

</script>

<template>
    <el-page-header :content="props.content" @back="goBack"/>
</template>