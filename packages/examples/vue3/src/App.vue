<script setup lang="ts">
import { ref } from 'vue';
import Button from '@wefly/vue-ui/es/Button/index';

const count = ref(1);

const add = () => count.value ++;
</script>

<template>
  <Button />
  <button @click="add">{{ count }}</button>
</template>

<style scoped>
</style>
