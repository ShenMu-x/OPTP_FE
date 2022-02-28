<script lang="ts" setup>
import { ResourceType } from '@/type';
 
const props = defineProps<{
    info: ResourceType
}>()
const load = () => {

}



</script>

<template>
    <div class="courseCt">
        <div class="title">{{info.title}}</div>
        <div class="rightCt">
            <el-button type="primary" class="rectBtn" @click="load">下载文件</el-button>
        </div>
    </div>
</template>

<style lang="less" scoped>
</style>