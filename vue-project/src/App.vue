<script setup>
import { ref, reactive, onBeforeMount, onMounted } from 'vue';

const list = reactive({
  tasks: [
    {
      id: 1,
      name: "Testing",
      status: "done"
    },
    {
      id: 2,
      name: "item 2",
      status: "ongoing"
    },
    {
      id: 3,
      name: "item 3",
      status: "ongoing"
    },
    {
      id: 4,
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

</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h3 text-center">My ToDo List</h1>
      </v-col>
    </v-row>
    <v-row >
      <v-col cols="9" align="end">
        <v-btn prepend-icon="$mdiPlus" variant="outlined" class="mx-auto">
          Add Task
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-card class="mx-auto mt-16" width="1000" :color="ongoingColor">
        <v-card-title class="py-0 pt-3">
          <p>Ongoing</p>
        </v-card-title>
        <v-card-item class="pt-3 pb-6">
          <v-list :bg-color="ongoingColor" class="border-t-lg">
            <v-list-item v-for="(item, index) in ongoingTask" :key="item.id" :value="item.id" class="border-b-md"
              @click="updateTask(item, index)">
              <div class="d-flex justify-space-between">
                <p v-if="item.status === 'ongoing'">{{ item.name }}</p>
                <v-btn variant="tonal" icon="$mdiClose" @click="deleteTask(item, index)">
                </v-btn>
              </div>
            </v-list-item>
          </v-list>
        </v-card-item>
      </v-card>
      <v-card class="mx-auto mt-16" width="1000" :color="doneColor">
        <v-card-title class="" py-0 pt-3>
          <p>Done</p>
        </v-card-title>
        <v-card-item class="pt-3 pb-6">
          <v-list :bg-color="doneColor" class="border-t-lg">
            <v-list-item v-for="(item, index) in doneTask" :key="item.id" :value="item.id" class="border-b-md"
              @click="updateTask(item, index)">
              <p>{{ item.name }}</p>
            </v-list-item>
          </v-list>
        </v-card-item>
      </v-card>
    </v-row>
  </v-container>
</template>

<style></style>