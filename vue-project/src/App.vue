<script setup>
import { ref, reactive, provide, onMounted, computed } from 'vue';
// import tasks from '@/tasks.json'
import AddTaskDialog from '@/components/AddTaskDialog.vue'
import TaskCategoryCard from './components/TaskCategoryCard.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import { mdiClose } from '@mdi/js'

const list = reactive({
  tasks: [],
});

const ongoingColor = ref("red-lighten-4");
const doneColor = ref("green-darken-2");
const sortBySelectValue = ref("");

/**
 * Object pada JS pass by reference
 */

const getTasks = async () => {
  try {
    const response = await axios.get('/api/tasks');
    list.tasks = response.data;
  } catch (error) {
    console.log(error)
  }
}

onMounted(getTasks);

const ongoingTask = computed(() => {
  return list.tasks.filter((task) => task.status === 'ongoing')
});
const doneTask = computed(() => {
  return list.tasks.filter((task) => task.status === 'done')
});

const sortBy = async () => {
  try {
    if (sortBySelectValue.value === 'Date') {
      list.tasks.sort((a, b) => {
        if (moment(a.createdAt).isBefore(moment(b.createdAt))) {
          return -1;
        } else if (moment(a.createdAt).isAfter(moment(b.createdAt))) {
          return 1;
        } else {
          return 0;
        }
      })
    } else if (sortBySelectValue.value === 'A-Z') {
      list.tasks.sort((a, b) => {
        if (a.name.localeCompare(b.name, { sensitivity: 'accent' }) < 0) {
          return -1;
        } else if (a.name.localeCompare(b.name, { sensitivity: 'accent' }) > 0) {
          return 1;
        } else {
          return 0;
        }
      })

      // const responseTemp = await axios.get('/api/tasks?_sort=name')
      // list.tasks = responseTemp.data

    } else if (sortBySelectValue.value === 'Z-A') {
      list.tasks.sort((a, b) => {
        if (a.name.localeCompare(b.name, { sensitivity: 'accent' }) < 0) {
          return 1;
        } else if (a.name.localeCompare(b.name, { sensitivity: 'accent' }) > 0) {
          return -1;
        } else {
          return 0;
        }
      })
    }
  } catch (error) {
    console.log(error);
  }
}

const taskToast = Swal.mixin({
  icon: 'success',
  iconColor: '#FFFFFF',
  showConfirmButton: false,
  toast: true,
  timerProgressBar: true,
  timer: 3000,
  position: 'top-right',
  background: '#00C853',
  customClass: {
    title: 'text-white',
  },
})

const taskConfirmation = Swal.mixin({
  icon: 'warning',
  backdrop: true,
  allowOutsideClick: false,
  allowEscapeKey: false,
  showConfirmButton: true,
  confirmButtonText: "Confirm",
  confirmButtonColor: "#00C853",
  showDenyButton: true,
  denyButtonText: "Cancel",
  denyButtonColor: "#D50000",
  background: '#FFFFFF',
  customClass: {
    confirmButton: "text-white",
    denyButton: "text-white",
    title: "text-black text-h5 font-weight-bold"
  }
})

provide('task', { getTasks, taskToast, taskConfirmation });

</script>

<template>
  <v-container max-width="100%">
    <v-row justify="center">
      <v-col cols="8">
        <h1 class="text-h3 text-center">My ToDo List</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="" cols="8">
        <v-row align="center" justify="space-between">
          <v-select clearable label="Sort By:" variant="outlined" :items="['Date', 'A-Z', 'Z-A']" max-width="15%"
            v-model="sortBySelectValue" @update:model-value="sortBy">
          </v-select>
          <v-btn :prepend-icon="mdiClose" variant="outlined">
            Add Task
            <AddTaskDialog />
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8">
        <TaskCategoryCard :card-color="ongoingColor" :ongoing-task="ongoingTask" category="Ongoing" />
        <TaskCategoryCard :card-color="doneColor" :ongoing-task="doneTask" category="Done" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>