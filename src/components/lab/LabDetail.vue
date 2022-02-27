<script lang="ts" setup>
import { labType } from '@/type';
import UploadFile from '../common/UploadFile.vue';
import { getLabDetail } from '@/utils/services'

const props = defineProps<{
    info: labType
}>();

const toEditIDE = () => {

}


</script>

<template>
    <div class="labDtCt">
        <div class="infoCt">
            <div class="title">实验情况</div>
            <div class="card">
                <div class="info">
                    创建日期:
                    <el-tag class="infoTag" type="info">{{ info.createAt }}</el-tag>
                </div>
                <div class="info">
                    截止日期:
                    <el-tag class="infoTag" type="info">{{ info.deadLine }}</el-tag>
                </div>
                <div class="info">
                    状态:
                    <div v-if="info.isFinish" class="tag done">已完成</div>
                    <div v-else class="tag undo">未完成</div>
                </div>
            </div>
        </div>
        <div>
            <div class="title">实验描述</div>
            <div class="card">{{ info.content }}</div>
        </div>
        <div>
            <div class="title">开始实验</div>
            <div class="card">
                <el-link v-if="info.attachmentUrl" :href="info.attachmentUrl" type="primary">点此进入实验</el-link>
            </div>
            <!-- toEditIDE -->
            <!-- <el-button class="rectBtn btn" @click="toEditIDE">开始实验</el-button> -->
        </div>
        <div>
            <div class="title">实验附件</div>
            <div class="card">
                <el-link v-if="info.attachmentUrl" :href="info.attachmentUrl" type="primary">点此下载附件</el-link>
                <div v-else>暂无附件</div>
            </div>
        </div>
        <div>
            <div class="title">提交实验报告</div>
            <div class="card">
                <UploadFile type="report" />
            </div>
        </div>
        <div>
            <div class="title">教师评语</div>
            <div class="card">{{ info.commment || '暂无评语' }}</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.labDtCt {
    display: flex;
    flex-direction: column;
}

.card {
    margin: 15px 10px 15px 0;
    text-align: left;
}
.info {
    margin-right: 10px;
    display: inline-block;
    .infoTag {
        font-size: 14px;
        line-height: 16px;
    }
}

.infoCt {
    .tag {
        padding: 0 5px;
        font-size: 14px;
        font-weight: bold;
        display: inline-block;
        color: #fff;

        &.done {
            background-color: #41da86;
        }

        &.undo {
            background-color: #e96262;
        }
    }
}

.title {
    text-align: left;
    font-size: 20px;
    font-weight: bold;
}

.btn {
    margin: 20px;
}

.uploadCard {
    margin: 20px 0;
}
</style>