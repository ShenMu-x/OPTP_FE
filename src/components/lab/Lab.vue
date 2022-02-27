<script lang="ts" setup>
import { ref, toRef } from 'vue';
import { InfoFilled } from '@element-plus/icons-vue';
import LabDetail from './LabDetail.vue';
import Tag from '../common/Tag.vue';
import { labType } from '@/type';
import { fmatDate } from '@/utils/helper';

const props = defineProps<{
    info: labType
}>();

const info = toRef(props, 'info');

const isDrawerOpen = ref(false);
const clickLabDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value;
}

const finishStatus = ref(info.value?.isFinish);
const updateStatus = (val: boolean) => {
    console.log(val)
    finishStatus.value = val;
    // 申请完成实验
}
</script>

<template>
    <div class="labCt">
        <div class="title">{{ info.title }}</div>
        <div class="content">{{ info.content }}</div>
        <div class="info">
            <div class="leftCt">
                <!-- 宽屏 -->
                <template class="timeCourse">
                    <div :title="info.createdAt">创建日期: {{ fmatDate(info.createdAt || "") }}</div>
                    <div :title="info.deadLine">截止日期: {{ fmatDate(info.deadLine || "") }}</div>
                    <div class="course" title="info.isBelongTo">所属课程: {{ info.courseName }}</div>
                </template>
                <!-- 小屏兼容 -->
                <template class="infoIcon">
                    <el-tooltip placement="top">
                        <template #content>
                            创建日期: {{ info.createdAt }}
                            <br />
                            截止日期: {{ info.deadLine }}
                            <br />
                            所属课程: {{ info.courseName }}
                        </template>
                        <span class="tipCt">
                            <InfoFilled style="height: 1.2em;width:1.2em;color: #606266" />
                        </span>
                    </el-tooltip>
                </template>
                <div class="status">
                    完成情况:
                    <el-switch
                        v-model="finishStatus"
                        class="switch"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="updateStatus"
                    />
                    <Tag
                        class="tag"
                        type="green"
                        v-show="finishStatus"
                        :green-text="'已完成'"
                        :is-text="true"
                    />
                    <Tag
                        class="tag"
                        type="red"
                        v-show="!finishStatus"
                        :red-text="'未完成'"
                        :is-text="true"
                    />
                </div>
            </div>
            <div class="rightCt">
                <el-button type="primary" class="rectBtn" @click="clickLabDrawer">进入实验</el-button>
            </div>
        </div>
        <el-drawer v-model="isDrawerOpen" :title="info.title" size="40%">
            <LabDetail :info="info" style="cursor: default;" />
        </el-drawer>
    </div>
</template>

<style lang="less" scoped>
.labCt {
    height: 200px;
    flex-basis: 100%;
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
}
.title {
    text-align: left;
    font-size: 22px;
    font-weight: 600;
    height: 40px;
}
.content {
    margin: 10px 0;
    font-size: 14px;
    text-align: left;
    height: 75px;
    overflow: hidden;
}

.info {
    height: 40px;
    width: calc(100%);
    overflow: hidden;
    display: flex;
    align-items: center;
    font-size: 14px;

    .switch {
        margin-left: 10px;
    }

    .leftCt {
        flex: 1;
        display: flex;

        .tag {
            font-size: 14px;
            font-weight: bold;
        }
    }
}

.drawer {
    width: 600px;
}
.timeCourse {
    display: none;
}

.infoIcon {
    display: flex;
    align-items: center;

    .tipCt {
        color: #002d54;
        margin-right: 10px;
    }
}

@media screen and (min-width: 1060px) {
    .timeCourse {
        display: flex;

        & > div {
            line-height: 40px;
            width: 140px;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 10px;
            text-align: left;
        }

        .course {
            width: 160px;
        }
    }

    .infoIcon {
        display: none;
    }
}
</style>