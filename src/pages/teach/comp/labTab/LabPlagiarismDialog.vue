<script lang="ts" setup>
import { ref } from 'vue';
import { requestPlagiarismDetailURL } from '@/utils/services';

const props = defineProps<{ url: string }>();
const htmlData = ref('');
requestPlagiarismDetailURL(props.url).then((res) => {
    if (res.code === 0) {
        htmlData.value = res.data || '';
    }
});
</script>

<template>
    <div class="ct" v-html="htmlData"></div>
</template>

<style lang="less" scoped>
.ct {
    height: 48vh;
    margin-bottom: 30px;
    width: 100%;
    background-color: white;
    overflow: auto;
}
</style>