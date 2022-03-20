<script lang="ts" setup>
import { ref } from 'vue';
import { labType } from '@/type';
import Tag from '../common/Tag.vue';
import UploadFile from '../common/UploadFile.vue';
import { getLabById } from '@/utils/services';

const props = defineProps<{ info: labType }>();
const lab = ref<labType>(props.info);
const ideUrl = location.origin + '/online_oj';

getLabById(props.info.labId).then(res => {
    if (res.code === 0) {
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
                    <span class="infoText">{{ lab.createdAt }}</span>
                </div>
                <div class="info">
                    截止日期:
                    <span class="infoText">{{ lab.deadLine }}</span>
                </div>
                <div class="info">
                    状态:
                    <Tag
                        v-if="lab.isFinish"
                        type="green"
                        :isText="true"
                        class="infoText"
                        greenText="已完成"
                    />
                    <Tag v-else type="red" :isText="true" class="infoText" redText="未完成" />
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
                <el-link v-if="ideUrl" :href="ideUrl" type="primary">点此进入实验</el-link>
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
    .infoText {
        font-weight: bold;
    }
}
.title {
    text-align: left;
    font-size: 20px;
    font-weight: bold;
}
</style>