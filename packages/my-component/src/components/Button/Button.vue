<template>
  <button class="vue-ui-button" @click="add">
    {{ count }}<img src="./images/arrow.svg" />
  </button>
</template>
<script lang="ts" setup>
import { ref } from "vue-demi";

const count = ref(0);

const add = () => {
  count.value++;
  console.log(count.value);
};
</script>
