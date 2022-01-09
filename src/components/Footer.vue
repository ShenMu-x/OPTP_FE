<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
    <div class="footer">
        <span>华南师范大学 版权所有 |Copyright © 2022 South China Normal University. All Rights Reserved</span>
    </div>
</template>

<style scoped>
.footer {
    height: 80px;
    border-top: 2px solid #c5b673;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
