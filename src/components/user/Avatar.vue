<template>
    <div :class="`avatar avatar-${data.type}`" :style="data.style">
        <img :src="data.src" :alt="data.src" class="avatar-image" />
    </div>
</template>

<style lang="less" scoped>
.avatar {
    // border: 1px solid #000;
    overflow: hidden;
}
.avatar-small {
    height: 40px;
    width: 40px;
}
.avatar-middle {
    height: 60px;
    width: 60px;
}

.avatar-large {
    height: 80px;
    width: 80px;
}

.avatar-image {
    width: 100%;
    height: 100%;
}
</style>

<script lang="ts" setup>
import { reactive } from "vue-demi";

const props = defineProps<{
    type?: 'small' | 'middle' | 'large',
    size?: number,
    src?: '',
    alt?: '',
    style?: ''
}>();

const data = reactive({
    type: props.type ?? 'middle',
    size: props.size ?? 60,
    src: props.src ?? 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
    alt: props.alt ?? '头像',
    style: props.style ?? ''
});

</script>