<script setup lang="ts">
import { ref } from "vue";
const h1 = ref("WelCome To Vue3");
</script>

<template>
  <h1>
    {{ h1 }}
  </h1>
</template>

<style scoped>
div {
  color: red;
}
</style>
