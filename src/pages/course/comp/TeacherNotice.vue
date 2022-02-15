<template>
    <div class="teacherCard">
        <Avatar type="middle" />
        <div class="teacherInfo" :title="props.teacherInfo.userName">
            任课老师:
            <b>{{ props.teacherInfo.userName }}</b>
        </div>
        <div class="teacherInfo" :title="props.teacherInfo.email">联系邮箱: {{ props.teacherInfo.email }}</div>
        <div
            class="teacherInfo"
            :title="props.teacherInfo.organization"
        >所属组织: {{ props.teacherInfo.organization }}</div>
    </div>
    <div class="noticeCard">公告卡片</div>
</template>

<script lang="ts" setup>
import Avatar from '@/components/user/Avatar.vue';
import { userInfoType } from '@/type';
const props = defineProps<{ teacherInfo: userInfoType }>();
</script>

<style lang="less" scoped>
@import url("@/styles/var.less");
.teacherCard {
    padding: 10px 0;
    margin-bottom: 20px;
    background-color: #fff;

    .avatar {
        margin: 10px auto;
    }

    .teacherInfo {
        margin: 0 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
    }
}

.noticeCard {
    height: 800px;
    background-color: #fff;
}
</style>