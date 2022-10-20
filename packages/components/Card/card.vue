<template>
    <div>{{ text }}</div>
</template>
<script lang="ts" setup>
import { computed } from 'vue-demi';

const text = computed(() => {
    return '这是一张绝美卡片'
})
</script>