<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const lessonId = route.params.lessonId;
</script>

<template>
    <div>{{lessonId}}</div>
</template>