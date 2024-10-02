<script setup>
import { ref, reactive } from 'vue';

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

const ongoingTask = [];
const doneTask = [];

list.tasks.forEach((task) => {
  if (task.status === 'ongoing') {
    ongoingTask.push(task);
  } else {
    doneTask.push(task);
  }
})

const updateTask = (id) => {
  list.tasks.sc
}
</script>

<template>
  <v-card class="mx-auto mt-16" max-width="1000" :color="ongoingColor">
    <v-card-title>
      
    </v-card-title>
    <v-card-item>
      <v-list :bg-color="ongoingColor" class="border-t-md">
        <v-list-item v-for="item in ongoingTask" :key="item.id" :value="item.id" class="border-b-md">
          <p v-if="item.status === 'ongoing'">{{ item.name }}</p>
        </v-list-item>
      </v-list>
    </v-card-item>
  </v-card>
  <v-card title="Done" class="mx-auto mt-16" max-width="1000" :color="doneColor">
    <v-card-item>
      <v-list :bg-color="doneColor">
        <v-list-item v-for="item in doneTask" :key="item.id" :value="item.id">
          <p>{{ item.name }}</p>
        </v-list-item>
      </v-list>
    </v-card-item>
  </v-card>
</template>

<style></style>