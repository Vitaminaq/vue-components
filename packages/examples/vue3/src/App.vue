<script setup lang="ts">
import { ref } from 'vue';
import { Button, Card } from '@wefly/vue-ui/es';
import '@wefly/vue-ui/style/Button/vue-button.css'
import '@wefly/vue-ui/style/Card/vue-card.css'
import ButtonColor from '@wefly/vue-ui/es/Button/ButtonColor';
import Input from "@wefly/vue-ui/es/Input/input";

const count = ref(1);

const add = () => count.value ++;
</script>

<template>
  <Button />
  <button @click="add">{{ count }}</button>
  <ButtonColor>我是vue2按钮</ButtonColor>
  <Card msg="hello,组件库" />
  <Input />
</template>

<style scoped>
</style>
