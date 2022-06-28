<script lang="ts" setup>
import { ref, watch } from 'vue';
import BtnBlue from '../common/BtnBlue.vue';
import Tag from '../common/Tag.vue';
import UploadFile from '../common/UploadFile.vue';
import { useDirect, isAfterCurrentTime } from '@/utils/helper';
import { getLabById } from '@/utils/services';
import { labType, emptyLab } from '@/type';

const props = defineProps<{ labId: number }>();
const currentLabInfo = ref<labType>({ ...emptyLab });
const currentLabId = ref(props.labId ?? 0);

const setCurrentLabInfo = () => {
    getLabById(currentLabId.value).then((res) => {
        if (res.code === 0) currentLabInfo.value = res.data as labType;
    });
};
setCurrentLabInfo();
watch(props, (newV, _) => {
    if (currentLabId.value !== newV.labId) {
        currentLabId.value = newV.labId ?? 0;
        setCurrentLabInfo();
    }
});

const { routerToIDE } = useDirect();
const toIDE = () => {
    routerToIDE({
        type: 'direct',
        params: { labId: props.labId ?? 0 },
    });
};
</script>

<template>
    <div class="labDtCt">
        <div class="infoCt">
            <div class="title">实验情况</div>
            <div class="card">
                <div class="infoInnerCt">
                    <div class="info">
                        创建日期:
                        <span class="infoText">{{ currentLabInfo.createdAt }}</span>
                    </div>
                    <div class="info">
                        截止日期:
                        <span class="infoText">{{ currentLabInfo.deadLine }}</span>
                    </div>
                </div>
                <div class="infoInnerCt">
                    <div class="info">
                        实验状态:
                        <Tag
                            v-if="isAfterCurrentTime(currentLabInfo.deadLine ?? '')"
                            type="green"
                            :isText="true"
                            class="infoText"
                            greenText="进行中"
                        />
                        <Tag v-else type="red" :isText="true" class="infoText" redText="已结束" />
                    </div>
                    <div class="info">
                        完成情况:
                        <Tag
                            v-if="currentLabInfo.isFinish"
                            type="green"
                            :isText="true"
                            class="infoText"
                            greenText="已完成"
                        />
                        <Tag v-else type="red" :isText="true" class="infoText" redText="未完成" />
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="title">实验描述</div>
            <div class="card">{{ currentLabInfo.content || '暂无描述' }}</div>
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
                <el-link
                    v-if="currentLabInfo.attachmentUrl"
                    :href="currentLabInfo.attachmentUrl"
                    type="primary"
                >
                    点此下载附件
                </el-link>
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
            <div class="card">{{ currentLabInfo.commment || '暂无评语' }}</div>
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