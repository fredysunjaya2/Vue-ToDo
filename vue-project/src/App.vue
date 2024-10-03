<script setup>
import { ref, reactive, onBeforeMount, onMounted } from 'vue';

const list = reactive({
  tasks: [
    {
      id: "e0303f61ef3f9",
      name: "Testing",
      status: "done"
    },
    {
      id: "d80c1ffbe9a2f",
      name: "item 2",
      status: "ongoing"
    },
    {
      id: "af966bae04967",
      name: "item 3",
      status: "ongoing"
    },
    {
      id: "47ae9eeece4c4",
      name: "item 4",
      status: "ongoing"
    },
  ]
});

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

const updateTask = (item, index) => {
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

const deleteTask = (item, index) => {
    if (item.status === 'ongoing') {
      ongoingTask.splice(index, 1);
    } else if (item.status === 'done') {
      doneTask.splice(index, 1);
    }
  }

const addTask = () => {
  const task = {
    id: Math.random().toString(16).slice(2),
    name: 'asd',
    status: 'ongoing'
  }

  ongoingTask.push(task);
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
        <v-btn prepend-icon="$mdiPlus" variant="outlined" class="mx-auto" @click="addTask">
          Add Task
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8">
        <v-card class="mx-auto mt-8" :color="ongoingColor">
          <v-card-title class="py-0 pt-3">
            <p>Ongoing</p>
          </v-card-title>
          <v-card-item class="pt-3 pb-6">
            <v-list :bg-color="ongoingColor" class="border-t-lg">
              <v-list-item v-for="(item, index) in ongoingTask" :key="item.id" :value="item.id" class="border-b-md"
                @click="updateTask(item, index)">
                <div class="d-flex justify-space-between align-center">
                  <p>{{ item.name }}</p>
                  <v-btn variant="tonal" icon="$mdiClose" @click="deleteTask(item, index)">
                  </v-btn>
                </div>
              </v-list-item>
            </v-list>
          </v-card-item>
        </v-card>
        <v-card class="mx-auto mt-8" :color="doneColor">
          <v-card-title class="" py-0 pt-3>
            <p>Done</p>
          </v-card-title>
          <v-card-item class="pt-3 pb-6">
            <v-list :bg-color="doneColor" class="border-t-lg">
              <v-list-item v-for="(item, index) in doneTask" :key="item.id" :value="item.id" class="border-b-md"
                @click="updateTask(item, index)">
                <div class="d-flex justify-space-between align-center">
                  <p>{{ item.name }}</p>
                  <v-btn variant="tonal" icon="$mdiClose" @click="deleteTask(item, index)"></v-btn>
                </div>
              </v-list-item>
            </v-list>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>