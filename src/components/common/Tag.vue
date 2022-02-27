<script lang="ts" setup>

const props = defineProps<{
    type: 'green' | 'red',
    isText?: boolean,
    greenText?: string,
    redText?: string
}>();
</script>

<template>
    <div
        :class="['tag', 'green', {
            'red': props.type === 'red',
            'rect': !props.isText,
            'redRect': !props.isText && props.type === 'red',
        }]"
    >
        <span v-if="props.type === 'red'">{{ props.redText ?? '已结束' }}</span>
        <span v-else>{{ props.greenText ?? '进行中' }}</span>
    </div>
</template>

<style lang="less" scoped>
.tag {
    display: inline-block;
    height: 26px;
    padding: 0 10px;
    line-height: 26px;
    font-size: 12px;
    user-select: none;
}
.rect {
    border-width: 1px solid #e1f3d8;
    border-radius: 4px;
    background-color: #f0f9eb;
}
.redRect {
    background-color: #fef0f0;
    border-color: #fde2e2;
}

.green {
    color: #67c23a;
}

.red {
    color: #f56c6c;
}
</style>