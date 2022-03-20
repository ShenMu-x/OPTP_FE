<script lang="ts" setup>
import { ref } from 'vue';
import { Refresh } from '@element-plus/icons-vue'
const props = defineProps<{
    isLoding?: boolean
}>();

const emits = defineEmits(['reload']);
const clickHandler = () => {
    emits('reload');
}

</script>

<template>
    <div>
        <el-button v-show="props.isLoding" loading class="btn">刷新</el-button>
        <el-button v-show="!props.isLoding" :icon="Refresh" @click="clickHandler" class="btn">刷新</el-button>
    </div>
</template>

<style lang="less" scoped>
.btn {
    margin-left: 0;
}
</style>