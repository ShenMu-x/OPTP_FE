<script lang="ts" setup>
const props = defineProps<{
    title: string,
}>();
</script>
<template>
    <div class="cardCt">
        <slot></slot>
        {{ props.title }}
    </div>
</template>
<style lang="less" scoped>
.cardCt {
    height: 100px;
    background-color: #fff;
    padding: 20px;
    flex-basis: 20%;
    width: 20%;
    min-width: 220px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    &:hover {
        cursor: pointer;
        box-shadow: 0 0 5px #5151e51e;
    }
}
</style>