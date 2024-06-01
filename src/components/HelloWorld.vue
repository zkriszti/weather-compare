<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
  <button type="button" @click="count--">-</button>
  <div :class="{'colored': count > 3}" class="box">count is {{ count }}</div>
  <button type="button" @click="count++">+</button>
  </div>

  
</template>

<style scoped>
.card {
  display: flex; 
  gap: 8px;
  justify-content: center;
}
.read-the-docs {
  color: #888;
}
.box {
  display: flex;
  align-items: center;
  padding: 0 12px;
}
.colored {
  background: wheat;
}
</style>
