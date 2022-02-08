<script lang="ts" setup>
import { labInfoType } from '@/type';
import { UploadFilled } from '@element-plus/icons-vue'

const props = defineProps<{
    labInfo: labInfoType
}>();


</script>

<template>
    <div class="labDtCt">
        <div class="infoCt">
            <div class="title">实验情况</div>
            <div class="card">
                <div class="info">创建日期: {{ labInfo.createAt }}</div>
                <div class="info">截止日期: {{ labInfo.endAt }}</div>
                <div class="info">
                    状态:
                    <div v-if="labInfo.isFinished" class="tag done">已完成</div>
                    <div v-else class="tag undo">未完成</div>
                </div>
            </div>
        </div>
        <div>
            <div class="title">实验描述</div>
            <div class="card">{{ labInfo.describe }}</div>
        </div>
        <div>
            <div class="title">开始实验</div>
            <el-button class="rectBtn btn">开始实验</el-button>
        </div>
        <div>
            <div class="title">提交实验报告</div>
            <!-- <el-button class="rectBtn btn">上传文件</el-button> -->
            <el-upload
                class="uploadCard"
                drag
                action=""
                multiple
            >
                <el-icon class="el-icon--upload">
                    <upload-filled />
                </el-icon>
                <div class="el-upload__text">
                    Drop file here or
                    <em>click to upload</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                </template>
            </el-upload>
        </div>
        <div>
            <div class="title">教师评语</div>
            <div class="card">{{ labInfo.reviews ?? '暂无评语' }}</div>
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
    font-size: 25px;
}

.btn {
    margin: 20px;
}

.uploadCard {
    margin: 20px 0;
}
</style>