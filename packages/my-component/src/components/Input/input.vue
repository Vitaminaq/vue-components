<template>
  <div>
    <input v-model="value" />
    <div>这里是输入值：{{ value }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue-demi";

const value = ref("");
</script>
