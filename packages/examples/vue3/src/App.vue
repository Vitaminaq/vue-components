<script setup lang="ts">
import { ref } from 'vue';
import { Button, Card } from '@wefly/vue-ui/es';
import '@wefly/vue-ui/style/Button/vue-button.css'
import '@wefly/vue-ui/style/Card/vue-card.css'

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
