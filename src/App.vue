<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

// setSize()
// function setSize() {
//   X.value = Math.floor(innerWidth / size) * Math.floor(innerHeight / size)
// }
// window.onresize = setSize

const size = 30
const _w = Math.floor(innerWidth / size)
const X = _w * Math.floor(innerHeight / size)

const arr = ref(Array(X).fill(0))

watch(arr, (l, r) => {
  const target = l.findIndex((l, i) => r[i] !== l)
  if (target + _w > X) return
  requestAnimationFrame(() => {
    const tmp = [...arr.value]
    tmp[target + _w]++
    arr.value = [...tmp]
  })
})
</script>

<template>
  <div class="parent">
    <div
      v-for="(x, i) in arr"
      v-on:click="
        () => {
          const tmp = [...arr]
          tmp[i]++
          arr = [...tmp]
        }
      "
    >
      {{ x }}
    </div>
  </div>
</template>

<style>
.parent {
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fill, v-bind(size + 'px'));
  grid-template-rows: repeat(auto-fill, v-bind(size + 'px'));
  background: #eee;
}
.parent div:hover {
  background: #aea;
}
</style>
