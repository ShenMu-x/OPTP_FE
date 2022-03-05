<script lang="ts" setup>

const props = defineProps<{
    type: 'green' | 'red',
    isText?: boolean,
    greenText?: string,
    redText?: string,
    border?: boolean
}>();
</script>

<template>
    <div
        :class="['tag', {
            'rect': !props.isText,
            'redRect': !props.isText && props.type === 'red',
            'green': props.isText && props.type === 'green',
            'red': props.isText && props.type === 'red',
            'redBorder': props.border && props.type === 'red',
            'greenBorder': props.border && props.type === 'green',
        }]"
    >
        <span v-if="props.type === 'red'">{{ props.redText || '已结束' }}</span>
        <span v-else>{{ props.greenText || '进行中' }}</span>
    </div>
</template>

<style lang="less" scoped>
.tag {
    display: inline-block;
    font-size: 14px;
    user-select: none;
    padding: 0 11px;
    height: 32px;
    line-height: 32px;
}
.rect {
    border-width: 1px solid #e1f3d8;
    border-radius: 4px;
    background-color: #41da86;
    color: #fff;
    font-weight: bold;
}
.redRect {
    background-color: #e96262;
    border-color: #fde2e2;
}

.green {
    color: #41da86;
}

.red {
    color: #e96262;
}

.redBorder {
    border: 1px solid #e96262;
}

.greenBorder {
    border: 1px solid #41da86;
}
</style>