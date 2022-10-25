<script setup lang="ts">
import { Button, Card } from '@wefly/vue-ui/es';
import '@wefly/vue-ui/style/Button/vue-button.css'
import '@wefly/vue-ui/style/Card/vue-card.css'
import ButtonColor from '@wefly/vue-ui/es/Button/ButtonColor';
import Input from "@wefly/vue-ui/es/Input/input";
</script>

<template>
    <div>
        <Button />
        <ButtonColor>我是vue2按钮</ButtonColor>
        <Card msg="hello, pixso组件库" />
        <Input />
    </div>
</template>

<style scoped>
</style>
