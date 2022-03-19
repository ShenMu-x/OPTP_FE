<script lang="ts" setup>

import { ref } from 'vue'
import { fetchIdeUrl } from '@/utils/services';

</script>

<template>
    <div>EDIT IDE</div>
    <button @click="fetchIdeUrl(1)">click</button>
</template>