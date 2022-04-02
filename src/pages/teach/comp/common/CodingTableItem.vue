<script lang="ts" setup>
import CodingTimeTable from '@/components/common/CodingTimeTable.vue';
const props = defineProps<{info: any}>();
</script>

<template>
    <div class="itemCt">
        <div class="infoCt">
            <div class="text"><b>姓名：</b>{{info.name}}</div>
            <div class="text"><b>学号: </b>{{info.number}}</div>
        </div>
        <CodingTimeTable :list="info.codingTime" :id="`${info.userId}`"/>
    </div>
</template>

<style lang="less" scoped>
.itemCt {
    background-color: #fff;
    min-width: 450px;
    flex-basis: 48%;
    width: 48%;
    margin: 10px 0;
    background-color: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    &:hover {
        cursor: pointer;
        box-shadow: 0 0 5px #5151e51e;
    }
}
.infoCt {
    display: flex;
    .text {
        max-width: 50%;
        margin: 10px 0 20px 20px;
    }
}
</style>