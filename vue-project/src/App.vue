<script setup>
import { ref, reactive, provide, onMounted, computed } from 'vue';
// import tasks from '@/tasks.json'
import AddTaskDialog from '@/components/AddTaskDialog.vue'
import TaskCategoryCard from './components/TaskCategoryCard.vue';
import axios from 'axios';


const list = reactive({
  tasks: [],
});

const ongoingColor = ref("red-lighten-4");
const doneColor = ref("green-darken-2");

/**
 * Object pada JS pass by reference
 */
onMounted(async () => {
  try {
    const response = await axios.get('/api/tasks');
    list.tasks = response.data;
  } catch (error) {
    console.log(error)
  }
})

const ongoingTask = computed(() => {
  return list.tasks.filter((task) => task.status === 'ongoing')
});
const doneTask = computed(() => {
  return list.tasks.filter((task) => task.status === 'done')
});

const markTask = async (item, index) => {
  try {
    let newStatus = "";
    if (item.status === 'ongoing') {
      newStatus = 'done';
    } else {
      newStatus = 'ongoing';
    }

    const result = await axios.patch(`/api/tasks/${item.id}`, {
      status: newStatus
    })

    const responseTemp = await axios.get('/api/tasks');
    list.tasks = responseTemp.data;
  } catch (error) {
    console.log(error)
  }
}

const updateTask = async (item, taskTitle) => {
  try {
    const result = await axios.patch(`/api/tasks/${item.id}`, {
      name: taskTitle,
    })

    const responseTemp = await axios.get('/api/tasks');
    list.tasks = responseTemp.data;
  } catch (error) {
    console.log(error);
  }
}

const deleteTask = async (item, index) => {
  try {
    const result = await axios.delete(`/api/tasks/${item.id}`)

    const responseTemp = await axios.get('/api/tasks');
    list.tasks = responseTemp.data;
  } catch (error) {
    console.log(error)
  }
}

const addTask = async (taskTitle) => {
  const task = {
    id: Math.random().toString(16).slice(2),
    name: taskTitle,
    status: 'ongoing'
  }

  try {
    const result = await axios.post('/api/tasks', task);

    const responseTemp = await axios.get('/api/tasks');
    list.tasks = responseTemp.data;

  } catch (error) {
    console.log(error);
  }

}

provide('task', { updateTask });


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
        <TaskCategoryCard :card-color="ongoingColor" :ongoing-task="ongoingTask" category="Ongoing" @mark-task="markTask"
          @delete-task="deleteTask" @update-task="updateTask" />
        <TaskCategoryCard :card-color="doneColor" :ongoing-task="doneTask" category="Done" @mark-task="markTask"
          :delete-task="deleteTask" @update-task="updateTask" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>