<script lang="ts" setup>
import { ref } from 'vue';
import { labType } from '@/type';
import Tag from '../common/Tag.vue';
import UploadFile from '../common/UploadFile.vue';
import { getLabById } from '@/utils/services';

const props = defineProps<{
    info: labType
}>();

const toEditIDE = () => {

}
const lab = ref<labType>(props.info);

getLabById(props.info.labId).then(res=> {
    if(res.code === 0) {
        console.log('lab info', lab.value)
        lab.value = res.data as labType;
    }
})


</script>

<template>
    <div class="labDtCt">
        <div class="infoCt">
            <div class="title">实验情况</div>
            <div class="card">
                <div class="info">
                    创建日期:
                    <el-tag class="infoTag" type="info">{{ lab.createdAt }}</el-tag>
                </div>
                <div class="info">
                    截止日期:
                    <el-tag class="infoTag" type="info">{{ lab.deadLine }}</el-tag>
                </div>
                <div class="info">
                    状态:
                    <Tag v-if="lab.isFinish" type="green" greenText="已完成"/>
                    <!-- <div  class="tag done"></div> -->
                    <!-- <div v-else class="tag undo">未完成</div> -->
                    <Tag v-else type="red" redText="未完成"/>
                </div>
            </div>
        </div>
        <div>
            <div class="title">实验描述</div>
            <div class="card">{{ lab.content || '暂无描述' }}</div>
        </div>
        <div>
            <div class="title">开始实验</div>
            <div class="card">
                <el-link v-if="lab.attachmentUrl" :href="lab.attachmentUrl" type="primary">点此进入实验</el-link>
            </div>
        </div>
        <div>
            <div class="title">实验附件</div>
            <div class="card">
                <el-link v-if="lab.attachmentUrl" :href="lab.attachmentUrl" type="primary">点此下载附件</el-link>
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
            <div class="card">{{ lab.commment || '暂无评语' }}</div>
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