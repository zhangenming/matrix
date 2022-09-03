<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
const _arr = Array(10000)
  .fill(0)
  .map((_, i) => i)
const arr = reactive(_arr)

const x = ref(0)
</script>

<template>
  <button @click="x++">x{{ x }}</button>
  <div class="x">
    <div v-for="(val, idx) in arr" @click="arr[idx]++">{{ arr[idx] }}</div>
  </div>
</template>

<style>
.x {
  display: flex;
  flex-wrap: wrap;
}
.x div {
  width: 40px;
}
</style>
