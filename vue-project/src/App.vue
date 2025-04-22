<template>
  <mainpart>
    <container>
      <section class="left">
        <tab @change:status="myTodolist.changeStaus" />
      </section>
      <secction class="right">
        <add @addTask="myTodolist.addData" />
        <div class="task-list">
          <div
            v-for="value in myTodolist.filterList"
            :key="value.id"
            class="task-item"
            :class="{ deleting: value.deleting }"
          >
            <template v-if="myTodolist.editingId.value === value.id" class="edit">
              <input
                v-model="myTodolist.editInput.value"
                @blur="myTodolist.saveEdit(value.id)"
                @keyup.enter="myTodolist.saveEdit(value.id)"
                class="edit-input"
                placeholder="请输入修改后的任务"
              />
            </template>
            <template v-else>
              <input
                type="checkbox"
                :checked="value.done"
                @change="myTodolist.finishTask(value.id)"
                class="checkbox"
              />
              <p class="content" :class="{ done: value.done }">{{ value.name }}</p>
              <span v-if="value.time" class="time"> {{ value.time }}</span>
              <button @click="myTodolist.startEdit(value.id, value.name)" class="change">
                修改
              </button>
              <button @click="myTodolist.deleteWithEffect(value.id)" class="delete change">删除</button>
            </template>
          </div>
        </div>
        <div class="counter">
          <p>任务总数:{{ myTodolist.taskList.length }}</p>
          <p>已完成任务数:{{ myTodolist.taskList.filter((item) => item.done).length }}</p>
          <p>未完成任务数:{{ myTodolist.taskList.filter((item) => !item.done).length }}</p>
        </div>
      </secction>
    </container>
  </mainpart>
</template>

<script setup>
import { ref, reactive } from 'vue'
import add from './add.vue'
import tab from './tab.vue'
class Todolist {
  constructor() {
    this.taskList = reactive(JSON.parse(localStorage.getItem('taskList') || '[]'))
    this.id=reactive(JSON.parse(localStorage.getItem('id'||0)) );
    this.editingId = ref(null)
    this.status = ref('all')
    this.editInput = ref('')
    this.addData = this.addData.bind(this)
    this.finishTask = this.finishTask.bind(this)
    this.extractTime = this.extractTime.bind(this)
    this.changeStaus = this.changeStaus.bind(this)
    this.saveEdit = this.saveEdit.bind(this)
    this.startEdit = this.startEdit.bind(this)
    this.deleteWithEffect = this.deleteWithEffect.bind(this)
  }

  finishTask(id) {
    const index = this.taskList.findIndex((item) => item.id === id)
    if (index !== -1) {
      this.taskList[index].done = !this.taskList[index].done
    }
    localStorage.setItem('taskList', JSON.stringify(this.taskList))
    localStorage.setItem('id', JSON.stringify(this.id))
  }

  
  extractTime(taskName) {
    const timeRegex = /(\d{1,2}[:]\d{1,2})/
    const match = taskName.match(timeRegex)
    if (match) {
      const extractedTime = match[0]
      return { name: taskName.replace(timeRegex, '').trim(), time: extractedTime }
    }
    return { name: taskName, time: null }
  }

  
  changeStaus(newStatus) {
    this.status.value = newStatus 
  }

  addData(data) {
    const { name, time } = this.extractTime(data.name)
    this.taskList.unshift({ id: this.id + 1, name, time, done: false })
    this.id++
    this.taskList.sort(this.timeSort)
    localStorage.setItem('taskList', JSON.stringify(this.taskList))
    localStorage.setItem('id', JSON.stringify(this.id)) 
  }

  saveEdit(id) {
    const index = this.taskList.findIndex((item) => item.id === id)
    if (index !== -1 && this.editInput.value.trim()) {
      this.taskList[index].name = this.editInput.value.trim() 
    }
    this.editingId.value = null 
    localStorage.setItem('taskList', JSON.stringify(this.taskList))
    localStorage.setItem('id', JSON.stringify(this.id))
  }

  startEdit(id, name) {
    this.editingId.value = id 
    this.editInput.value = name 
  }
  timeSort(a, b) {
    const parseTime = (time) => {
      if (!time) return null;
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes; 
    };
    let comparedone = a.done - b.done

    const timeA = parseTime(a.time);
    const timeB = parseTime(b.time);

    if (timeA !== null && timeB !== null) {
      if (comparedone!=0) {
        return comparedone 
      }
      return timeA - timeB; 
    } else if (timeA !== null) {
      return -1; 
    } else if (timeB !== null) {
      return 1; 
    } else {
      return comparedone 
    }
  }

  basetimeSort() {
    this.taskList.sort(this.timeSort)
  }

  baseSort() {
    this.taskList.sort(this.mysort)
  }

  deleteWithEffect(id) {
    const index = this.taskList.findIndex((item) => item.id === id)
    if (index !== -1) {
      this.taskList[index].deleting = true
      setTimeout(() => {
        this.taskList.splice(index, 1)
        localStorage.setItem('taskList', JSON.stringify(this.taskList))
        localStorage.setItem('id', JSON.stringify(this.id))
      }, 300)
    }
  }


  get filterList() {
    const sortedList = [...this.taskList]
    sortedList.sort(this.mysort)
    sortedList.sort(this.timeSort)
    if (this.status.value === 'all') {
      return sortedList
    } else if (this.status.value === 'done') {
      return sortedList.filter((item) => item.done)
    } else if (this.status.value === 'undone') {
      return sortedList.filter((item) => !item.done)
    }
  }
}
const myTodolist = new Todolist('todoist')
</script>
<style lang="css" scoped>
@import './assets/mycss.css';
</style>
