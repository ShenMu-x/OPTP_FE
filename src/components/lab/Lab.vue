<script lang="ts" setup>
import { ref, toRef } from 'vue';
import { InfoFilled } from '@element-plus/icons-vue';
import Tag from '../common/Tag.vue';
import BtnBlue from '../common/BtnBlue.vue';
import { labType } from '@/type';
import { fmatDate, useDirect, isAfterCurrentTime } from '@/utils/helper';
import { setLabStatus } from '@/utils/services';

const props = defineProps<{ info: labType }>();
const info = toRef(props, 'info');
const emits = defineEmits(['openDrawer']);
const openLabDrawer = () => emits('openDrawer', info.value);

const finishStatus = ref(info.value.isFinish ?? false);
const updateLabStatus = () => {
    setLabStatus({
        isFinish: finishStatus.value,
        labId: info.value?.labId ?? 0,
    });
};
const { routerToIDE } = useDirect();
const toIDE = () =>
    routerToIDE({
        type: 'direct',
        params: { labId: info.value.labId ?? 0 },
    });
</script>

<template>
    <div class="labCt" @click="openLabDrawer">
        <div class="titleCt">
            <div class="title">{{ info.title }}</div>
            <Tag :type="isAfterCurrentTime(info.deadLine ?? '') ? 'green' : 'red'" />
        </div>
        <div class="content">{{ info.content }}</div>
        <div class="info">
            <div class="leftCt">
                <!-- 宽屏 -->
                <template class="timeCourse">
                    <div class="courseDate" :title="info.createdAt">
                        创建日期: {{ fmatDate(info.createdAt || '') }}
                    </div>
                    <div class="courseDate" :title="info.deadLine">
                        截止日期: {{ fmatDate(info.deadLine || '') }}
                    </div>
                    <div v-if="info.courseName" class="course" :title="info.courseName">
                        所属课程: {{ info.courseName }}
                    </div>
                </template>
                <!-- 小屏兼容(底部信息收起) -->
                <template class="infoIcon">
                    <el-tooltip placement="top">
                        <template #content>
                            创建日期: {{ info.createdAt }}
                            <br />
                            截止日期: {{ info.deadLine }}
                            <br />
                            <span v-if="info.courseName">所属课程: {{ info.courseName }}</span>
                        </template>
                        <span class="tipCt">
                            <InfoFilled style="height: 1.2em; width: 1.2em; color: #606266" />
                        </span>
                    </el-tooltip>
                </template>
                <div class="status" @click.stop="">
                    完成情况:
                    <el-switch
                        v-model="finishStatus"
                        class="switch"
                        active-color="#41da86"
                        inactive-color="#e96262"
                        @change="updateLabStatus"
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
                <BtnBlue size="large" @click.stop="toIDE">开始实验</BtnBlue>
            </div>
        </div>
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

    &:hover {
        cursor: pointer;
    }
}

.titleCt {
    display: flex;

    .title {
        text-align: left;
        font-size: 22px;
        font-weight: 600;
        height: 40px;
        margin-right: 20px;
    }
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

@media screen and (min-width: 1200px) {
    .timeCourse {
        display: flex;

        .courseDate,
        .course {
            line-height: 40px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 10px;
            text-align: left;
        }

        .courseDate {
            width: 140px;
        }

        .course {
            min-width: 160px;
            max-width: 350px;
        }
    }

    .infoIcon {
        display: none;
    }
}
</style>