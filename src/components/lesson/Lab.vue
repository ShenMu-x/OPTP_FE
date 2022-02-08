<script lang="ts" setup>
import { reactive, ref } from 'vue';
import LabDetail from './LabDetail.vue';
import { labInfoType } from '@/type';
import { InfoFilled } from '@element-plus/icons-vue';

const props = defineProps<{
    labInfo: labInfoType
}>();

const labInfo = reactive(props.labInfo);

const finishStatus = ref(labInfo.isFinished);

const isDrawerOpen = ref(false);
const clickLabDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value;
}
</script>

<template>
    <div class="labCt">
        <div class="labTitle">{{ labInfo.title }}</div>
        <div class="labDiscribe">{{ labInfo.describe }}</div>
        <div class="labInfo">
            <div class="leftCt">
                <template class="labCommonInfo">
                    <div class="info">创建日期: {{ labInfo.createAt }}</div>
                    <div class="info">截止日期: {{ labInfo.endAt }}</div>
                    <div
                        class="info course"
                        title="labInfo.isBelongTo"
                    >所属课程: {{ labInfo.isBelongTo }}</div>
                </template>
                <template class="labInfoIcon">
                    <el-tooltip placement="top">
                        <template #content>
                            创建日期: {{ labInfo.createAt }}
                            <br />截止日期: {{ labInfo.endAt }}
                            <br />所属课程: {{ labInfo.isBelongTo }}
                        </template>
                        <span class="tipCt"><InfoFilled style="height: 1.2em;width:1.2em;color: #606266" /></span>
                    </el-tooltip>
                </template>
                <div class="info">
                    完成情况:
                    <el-switch
                        v-model="finishStatus"
                        class="finishSwtich"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    />
                    <span class="finishText done" v-show="finishStatus">已完成</span>
                    <span class="finishText undo" v-show="!finishStatus">未完成</span>
                </div>
            </div>
            <div class="rightCt">
                <el-button type="primary" class="rectBtn" @click="clickLabDrawer">进入实验</el-button>
            </div>
        </div>
        <el-drawer v-model="isDrawerOpen" :title="labInfo.title" size="40%">
            <LabDetail :labInfo="labInfo" />
        </el-drawer>
    </div>
</template>

<style lang="less" scoped>
.labCt {
    height: 200px;
    padding: 20px 40px 0;
    border-bottom: 1px solid #aaa;
}
.labTitle {
    text-align: left;
    font-size: 25px;
    font-weight: 600;
    height: 40px;
}
.labDiscribe {
    margin: 10px 0;
    font-size: 14px;
    text-align: left;
    height: 75px;
    overflow: hidden;
}

.labInfo {
    height: 40px;
    width: calc(100%);
    overflow: hidden;
    display: flex;
    align-items: center;

    font-size: 14px;

    .leftCt {
        flex: 1;
        display: flex;

        .info {
            line-height: 40px;
            margin-right: 10px;

            &.course {
                text-align: left;
                width: 200px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }

        .finishStatus {
            margin-left: 10px;
        }

        .finishText {
            display: inline-block;
            margin-left: 10px;
            font-weight: bold;

            &.done {
                color: #13ce66;
            }

            &.undo {
                color: #ff4949;
            }
        }
    }
}

.drawer {
    width: 600px;
}
.labCommonInfo {
    display: none;
}

.labInfoIcon {
    display: flex;
    align-items: center;

    .tipCt {
        color: #002d54;
        margin-right: 10px;
    }
}

@media screen and (min-width: 1060px) {
    .labCommonInfo {
        display: flex;
    }

    .labInfoIcon {
        display: none;
    }
}
</style>