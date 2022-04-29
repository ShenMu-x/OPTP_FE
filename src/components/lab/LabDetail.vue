<script lang="ts" setup>
import { ref, toRef, watch } from 'vue';
import BtnBlue from '../common/BtnBlue.vue';
import Tag from '../common/Tag.vue';
import UploadFile from '../common/UploadFile.vue';
import { useDirect, isAfterCurrentTime } from '@/utils/helper';
import { getLabById } from '@/utils/services';
import { ROUTE_NAME } from '@/router/routeName';
import { labType } from '@/type';
import { getIDEUrl } from './logic';

const props = defineProps<{ info: labType }>();
const info = toRef(props, 'info');
const lab = ref<labType>(props.info);
const id = ref(0);

const { routerToIDE } = useDirect();
const toIDE = () => routerToIDE({
    type: 'direct',
    params: { labId: info.value.labId ?? 0 }
})

const getLabInfo = () => {
    getLabById(id.value)
        .then(res => {
            if (res.code === 0) lab.value = res.data as labType;
        })
}
watch(info, (newV, _) => {
    if (id.value !== newV.labId) {
        id.value = newV.labId ?? 0;
        getLabInfo();
    }
})
</script>

<template>
    <div class="labDtCt">
        <div class="infoCt">
            <div class="title">实验情况</div>
            <div class="card">
                <div class="infoInnerCt">
                    <div class="info">
                        创建日期:
                        <span class="infoText">{{ lab.createdAt }}</span>
                    </div>
                    <div class="info">
                        截止日期:
                        <span class="infoText">{{ lab.deadLine }}</span>
                    </div>
                </div>
                <div class="infoInnerCt">
                    <div class="info">
                        实验状态:
                        <Tag v-if="isAfterCurrentTime(lab.deadLine ?? '')" type="green" :isText="true" class="infoText"
                            greenText="进行中" />
                        <Tag v-else type="red" :isText="true" class="infoText" redText="已结束" />
                    </div>
                    <div class="info">
                        完成情况:
                        <Tag v-if="lab.isFinish" type="green" :isText="true" class="infoText" greenText="已完成" />
                        <Tag v-else type="red" :isText="true" class="infoText" redText="未完成" />
                    </div>
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
                <BtnBlue size="large" @click="toIDE">点此进入实验</BtnBlue>
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
    flex-direction: column;

    .infoInnerCt {
        display: flex;
        flex-wrap: wrap;
    }
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