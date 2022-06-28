<script lang="ts" setup>
import { ref, watch } from 'vue';
import { defaultOrder, orderOptions, reverseOptions } from './orderSwitchConfig';
const isFocus = ref(false);
const changeSwich = () => {};
const orderValue = ref(defaultOrder);
const isReverse = ref(false);
const emits = defineEmits(['orderchange']);
watch(isReverse, (newV) => {
    emits('orderchange', { orderValue: orderValue.value, isReverse: newV });
});
watch(orderValue, (newV) => {
    emits('orderchange', { orderValue: newV, isReverse: isReverse.value });
});
</script>

<template>
    <div class="select-ct">
        <span class="label">排序方式</span>
        <el-select v-model="orderValue">
            <el-option
                v-for="item in orderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
        </el-select>
        <span class="label">升降序</span>
        <el-select v-model="isReverse">
            <el-option
                v-for="item in reverseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
        </el-select>
    </div>
</template>

<style lang="less" scoped>
.select-ct {
    margin-left: auto;
    margin-right: 10px;
}
.label {
    margin: 10px 5px;
    font-size: 16px;
}
</style>
