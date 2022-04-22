<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue';
import FeatureCard from './FeatureCard.vue';
import { useDirect } from '@/utils/helper';

const { routerToOnlineOJ } = useDirect();
const redirectToOnlineOJ = () => routerToOnlineOJ('direct')
</script>

<template>
    <div class="featuresCt">
        <FeatureCard title="语法练习" @click="redirectToOnlineOJ">
            <el-icon size="large">
                <Edit />
            </el-icon>
        </FeatureCard>
    </div>
</template>

<style lang="less" scoped>
.featuresCt {
    display: flex;
    min-height: 480px;
    padding-top: 20px;
}
</style>