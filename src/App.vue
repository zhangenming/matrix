<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
const SPEED = ref(1)
const size = 10
const _w = Math.floor(innerWidth / size)
const _h = Math.floor(innerHeight / size)
const X = ref(_w * _h)

console.log(_w, _h, X.value)

window.onresize = function setSize() {
  X.value = _w * _h
}

const arr = ref(Array(X.value).fill(0))
const str = ref(
  Array(X.value)
    .fill(0)
    .map(() =>
      String.fromCharCode(Math.floor(Math.random() * 26) + 'A'.charCodeAt(0))
    )
)

const tick = ref(1)
function setTick(target: number) {
  if (target >= X.value) {
    target = target - X.value
  }

  const tmp = [...arr.value]
  tmp[target] = tick.value
  arr.value = [...tmp]
}

let targets: number[] = []
watch(arr, (l, r) => {
  targets.push(
    ...l
      .map((e, i) => ({ e, i }))
      .filter(({ e, i }) => r[i] !== e)
      .map(({ i }) => i + _w)
  )
})

let _t = 0
function nextTick() {
  if (!(_t++ % SPEED.value)) {
    tick.value++
    while (targets.length) {
      const target = targets.pop()!
      setTick(target)
    }
  }

  requestAnimationFrame(nextTick)
}
requestAnimationFrame(nextTick)

setTick(334)

function getStyle(val: number) {
  return
  if (!val) return
  // if (tick.value - val > 10) return

  const style: any = {}

  const opacity = 1 - (tick.value - val) / 10
  if (opacity >= 0) {
    style.opacity = opacity
  }

  return {
    ...style,
  }
}
</script>

<template>
  <div class="parent">
    <div class="ctrl">
      <button class="btn" @click="setTick(Math.floor(Math.random() * X))">
        setTick {{ tick }}
      </button>

      <button @click="SPEED--">add</button>
      SPEED: {{ SPEED }}
      <button @click="SPEED++">sub</button>
    </div>

    <div
      v-for="(val, idx) in arr"
      :style="getStyle(val)"
      v-on:click="setTick(idx)"
    >
      <!-- {{ val ? val : '' }} -->
      <!-- {{ String.fromCharCode(Math.floor(Math.random() * 26) + 'A'.charCodeAt(0))}} -->
      {{ str[idx] }}
    </div>
  </div>
</template>

<style>
.parent {
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fill, v-bind(size + 'px'));
  grid-template-rows: repeat(auto-fill, v-bind(size + 'px'));
  overflow: hidden;
}
.parent div {
  background: #eee;
  opacity: 0;
}
.parent div:hover {
  background: #aea;
  opacity: 1;
}

.parent .ctrl {
  position: absolute;
  top: 0;
  background: rosybrown;
  z-index: 1;
  opacity: 1;
}
</style>
