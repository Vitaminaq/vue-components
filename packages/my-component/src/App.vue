<script setup lang="ts">
import Button from "@component/Button/Button.vue";
import ButtonColor from "@component/Button/ButtonColor.vue";
import Card from "@component/Card/Card.vue";
import Input from "@component/Input/Input.vue";
</script>

<template>
  <div>
    hello 组件组
    <Button />
    <ButtonColor iconName="close" :operate="true">我是vue2写法的按钮</ButtonColor>
    <Card msg="hello pixso 组件库" />
    <Input />
  </div>
</template>

<style scoped></style>
