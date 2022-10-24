<template>
    <div class="vue-ui-card">{{ props.msg }}</div>
</template>
<script lang="ts" setup>
const props = defineProps({
    msg: {
        type: String,
        default: '这是一张绝美卡片'
    }
})
</script>
