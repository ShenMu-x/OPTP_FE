<script lang="ts" setup>
import { onMounted, ref, watch, Ref } from 'vue';
import LoadBtn from '@/components/common/LoadBtn.vue';
import { useReloader } from '@/utils/helper';

const props = defineProps<{ refListEl: any }>();
let isReloading: Ref<boolean> = ref(false), reloadHandler: (() => void) = () => { }, finishReload: (() => void) = () => { };
onMounted(() => {
    const {
        isReloading: isReloadingNew,
        reloadHandler: reloadHandlerNew,
        finishReload: finishReloadNew,
    } = useReloader(props.refListEl);
    isReloading = isReloadingNew, reloadHandler = reloadHandlerNew, finishReload = finishReloadNew;
})
</script>
<template>
    <div>
        <div class="btnCt">
            <LoadBtn @reload="reloadHandler" :is-loding="isReloading" />
        </div>
        <slot name="list" v-bind:finishReload="finishReload">
            <el-empty v-show="!isReloading" description="暂无实验" style="flex: 1" />
        </slot>
    </div>
</template>

<style lang="less" scoped>
.btnCt {
    display: flex;
    width: 300px;
}
</style>