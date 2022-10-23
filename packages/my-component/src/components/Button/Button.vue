<template>
    <button class="add" @click="add">{{ count }}</button>
</template>
<script lang="ts" setup>
import { ref } from 'vue-demi';

const count = ref(0);

const add = () => {
    count.value ++;
    console.log(count.value);
}
</script>
<!-- 
<style lang="less">
.add {
    color: red;
}
</style> -->
