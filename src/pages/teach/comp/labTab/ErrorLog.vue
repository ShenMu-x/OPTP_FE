<script lang="ts" setup>
import { ref } from 'vue';
import { useLabId } from '@/utils/helper';
import { getLabErrorLog } from '@/utils/services';

const labId = useLabId();
const log = ref("")

getLabErrorLog(labId)
    .then(res => {
        if (res.code === 0) log.value = res.data?.compilerErrorLog || "";
    })
</script>

<template>
    <div class="log" v-if="log.length">
        <pre>{{ log }}</pre>
    </div>
    <el-empty description="暂无编译失败记录" style="flex: 1" v-else />
</template>