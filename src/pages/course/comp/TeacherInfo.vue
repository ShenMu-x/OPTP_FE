<script lang="ts" setup>
import Avatar from '@/components/common/Avatar.vue';
import { userInfoType } from '@/type';
const props = defineProps<{ info: userInfoType }>();
</script>

<template>
    <div class="teacherCard">
        <Avatar type="middle" :src="props.info.avatarUrl" />
        <div class="info" :title="props.info.realName">
            任课老师:
            <b>{{ props.info.realName }}</b>
        </div>
        <div class="info" :title="props.info.email">联系邮箱: {{ props.info.email }}</div>
        <!-- <div class="info" :title="props.info.organization">所属组织: {{ props.info.organization }}</div> -->
    </div>
</template>

<style lang="less" scoped>
@import url("@/styles/var.less");

.teacherCard {
    padding: 10px 0;
    margin-bottom: 20px;
    background-color: #fff;

    .avatar {
        margin: 10px auto;
    }

    .info {
        margin: 0 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
    }
}
</style>