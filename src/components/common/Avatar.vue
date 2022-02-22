<script lang="ts" setup>
import { reactive } from "vue-demi";
import { DEFAULT_AVATAR } from "@/utils/helper";

const props = defineProps<{
    type?: 'small' | 'middle' | 'large',
    size?: number,
    src?: string,
    alt?: string,
    style?: string
}>();

const data = reactive({
    type: props.type ?? 'middle',
    size: props.size ?? 60,
    src: props.src ?? DEFAULT_AVATAR,
    alt: props.alt ?? '头像',
    style: props.style ?? ''
});

</script>

<template>
    <div :class="`avatar avatar-${data.type}`" :style="data.style">
        <img :src="data.src" :alt="data.src" class="avatar-image" />
    </div>
</template>

<style lang="less" scoped>
.avatar {
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