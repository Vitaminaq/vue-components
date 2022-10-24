<script setup lang="ts">
import { ref } from 'vue';
import { Button, Card } from '@wefly/vue-ui/es';

const count = ref(1);

const add = () => count.value ++;
</script>

<template>
  <Button />
  <button @click="add">{{ count }}</button>

  <Card msg="hello,组件库" />
</template>

<style scoped>
</style>
