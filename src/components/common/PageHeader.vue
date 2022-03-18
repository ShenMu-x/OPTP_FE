<script lang="ts" setup>
import { useDirect } from '@/utils/helper';

const { routerBack } = useDirect();
const props = defineProps<{
  content: string
}>()
</script>

<template>
  <el-page-header :content="props.content" title="返回" @back="routerBack" class="header" />
</template>

<style lang="less" scoped>
.header {
  margin: 20px;
}
</style>