<script lang="ts" setup>
import { toRefs } from "vue";
import { DEFAULT_AVATAR } from "@/utils/option";

const props = defineProps<{
    type?: 'small' | 'middle' | 'large',
    size?: number,
    src?: string,
    alt?: string,
    style?: string
}>();
const { type, size, src, alt, style } = toRefs(props);

</script>

<template>
    <div :class="`avatar avatar-${type || 'middle'}`" :style="style || ''">
        <img :src="src || DEFAULT_AVATAR" :alt="alt ?? '头像'" class="avatar-image" />
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