<script setup>
import { ref, reactive } from 'vue';
import tasks from '@/tasks.json'
import AddTaskDialog from '@/components/AddTaskDialog.vue'
import TaskCategoryCard from './components/TaskCategoryCard.vue';

const list = reactive(tasks);

const ongoingColor = ref("red-lighten-4");
const doneColor = ref("green-darken-2");

const ongoingTask = reactive([]);
const doneTask = reactive([]);

list.tasks.forEach((task) => {
  if (task.status === 'ongoing') {
    ongoingTask.push(task);
  } else {
    doneTask.push(task);
  }
})

const markTask = (item, index) => {
  if (item.status === 'ongoing') {
    item.status = 'done';
    const task = ongoingTask.splice(index, 1);
    doneTask.push(task[0]);
  } else if (item.status === 'done') {
    item.status = 'ongoing';
    const task = doneTask.splice(index, 1);
    ongoingTask.push(task[0]);
  }
}

const updateTask = (formValid, item, taskTitle) => {
  if (item.status === 'ongoing') {
    console.log('here');
    item.name = taskTitle;
  } else if (item.status === 'done') {
    item.name = taskTitle;
  }
}

const deleteTask = (item, index) => {
  if (item.status === 'ongoing') {
    ongoingTask.splice(index, 1);
  } else if (item.status === 'done') {
    doneTask.splice(index, 1);
  }
}

const addTask = (formValid, taskTitle) => {
  if (formValid) {

    const task = {
      id: Math.random().toString(16).slice(2),
      name: taskTitle,
      status: 'ongoing'
    }

    ongoingTask.push(task);
  }
}

</script>

<template>
  <v-container max-width="100%">
    <v-row justify="center">
      <v-col cols="8">
        <h1 class="text-h3 text-center">My ToDo List</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col align="end" class="" cols="8">
        <v-btn prepend-icon="$mdiPlus" variant="outlined" class="mx-auto">
          Add Task
          <AddTaskDialog @add-task="addTask" />
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8">
        <TaskCategoryCard :card-color="ongoingColor" :ongoing-task="ongoingTask" @mark-task="markTask"
          @delete-task="deleteTask" />
        <TaskCategoryCard :card-color="doneColor" :ongoing-task="doneTask" @mark-task="markTask"
          :delete-task="deleteTask" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>