<script lang="ts" setup>
import { toRef } from 'vue';
import { fmatDate, useDialog } from '@/utils/helper';

const props = defineProps<{
    info: {
        resourceId: number,
        courseId: number,
        title: string,
        content: string,
        attachmentUrl: string,
        createAt: string,
        updateAt: string
    }
}>()
const info = toRef(props, 'info');
const { isDialogOpen, openDialog } = useDialog();
</script>

<template>
    <div class="item" @click="openDialog">
        <div class="itemTitle" :title="info.title">· {{ info.title }}</div>
        <div class="content" :title="info.content">{{ info.content }}</div>
        <div class="createAt">{{ fmatDate(info.createAt) }}</div>
    </div>
    <el-dialog v-model="isDialogOpen" title="公告详情">
        <div class="detailCt">
            <div class="label">名称</div>
            <div>{{ info.title }}</div>
        </div>
        <div class="detailCt">
            <div class="label">详情</div>
            <div>{{ info.content }}</div>
        </div>
        <div class="detailCt">
            <div class="label">附件</div>
            <a class="link" :href="info.attachmentUrl" v-if="info.attachmentUrl">点击下载附件</a>
            <div v-else>本公告下暂无附件</div>
        </div>
    </el-dialog>
</template>

<style lang="less" scoped>
.item {
    margin: 0 20px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    height: 30px;
    line-height: 30px;

    &:hover {
        cursor: pointer;
        background-color: #f5f5f5;
    }

    .itemTitle {
        width: 25%;
        margin-right: 20px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
    }

    .content {
        flex: 1;
        margin-right: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        white-space: nowrap;
    }

    .createAt {
        width: 82px;
    }
}

.detailCt {
    display: flex;
    text-align: left;
    margin-bottom: 10px;

    .label {
        flex: 0 0 40px;
        width: 40px;
        margin-right: 20px;
        font-weight: bold;
    }

    .link {
        text-decoration: none;
        color: #002d54;

        &:hover {
            font-weight: 500;
        }
    }
}
</style>