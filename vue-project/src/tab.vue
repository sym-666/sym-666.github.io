<template>
<div>
<p>tab栏</p>
<button @click="changeStatus('all')">全部</button>
<button @click="changeStatus('undone')">未完成</button>
<button @click="changeStatus('done')">已完成</button>
</div>
</template>

<script setup>
import { ref, reactive, computed, defineEmits } from 'vue';
const emit = defineEmits(['change:status']);
function changeStatus(newStatus) {
    emit('change:status', newStatus);
}
</script>

<style lang="css" scoped>
div{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-bottom: 10px;
}
button{
    margin: 5px;
    padding: 5px 10px;
    border: none;
    background-color:rgb(160, 190, 207);
    color: white;
    border-radius: 5px;
    cursor: pointer;
}
p{
    font-size: 20px;
    font-weight: bold;
    align-self: center;
}
button:hover{
    background-color: darkgrey;
}
</style>