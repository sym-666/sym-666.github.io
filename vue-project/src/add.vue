<template>
  <div>
    <input type="text" v-model="task" @keyup.enter="emitAddTask" placeholder="请输入任务" />
    <button @click="emitAddTask">Add</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const task = ref('')
const emit = defineEmits(['addTask'])
function emitAddTask() {
  if (task.value) {
    emit('addTask', { name: task.value, done: false })
    task.value = '' 
  }
}
</script>

<style lang="css" scoped>

input {
  border: none; 
  border-bottom: 2px solid grey; 
  outline: none; 
  padding: 5px; 
  font-size: 16px; 
  width: 80%; 
  box-sizing: border-box; 
  margin-right: 10px; 
}
input:focus {
  border-bottom: 2px solid rgb(160, 190, 207); 
}
button {
  background-color: rgb(160, 190, 207);
  color: white;
  font-size: 10px;
  @media (min-width: 768px) {
    font-size: 14px; 
  }
  @media (min-width: 1024px) {
    font-size: 16px; 
  }
  height: 32px; 
  border-radius: 5px; 
  padding: 5px 10px; 
  border: none; 
  
}
div{
margin-top: 5px;
margin-bottom: 5px;
}
</style>
