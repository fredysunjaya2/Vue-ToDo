<script setup>
import { ref, onMounted } from "vue";
// import tasks from '@/tasks.json'
import AddTaskDialog from "@/components/AddTaskDialog.vue";
import TaskCategoryCard from "./components/TaskCategoryCard.vue";
import { mdiPlus } from "@mdi/js";

import { useTodosStore } from "@/stores/todos";
import { storeToRefs } from "pinia";

const todosStore = useTodosStore();
const { ongoingTask, doneTask, sortBySelectValue } = storeToRefs(todosStore);
const { getTask, sortByTask } = todosStore;

onMounted(() => {
  getTask();
});

const ongoingColor = ref("red-lighten-4");
const doneColor = ref("green-darken-2");

/**
 * Object pada JS pass by reference
 */
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
          <v-select
            clearable
            label="Sort By:"
            variant="outlined"
            :items="['Date', 'A-Z', 'Z-A']"
            max-width="15%"
            v-model="sortBySelectValue"
            @update:model-value="sortByTask"
          >
          </v-select>
          <v-btn :prepend-icon="mdiPlus" variant="outlined">
            Add Task
            <add-task-dialog />
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8">
        <task-category-card
          :card-color="ongoingColor"
          :tasks="ongoingTask"
          category="Ongoing"
        />
        <task-category-card
          :card-color="doneColor"
          :tasks="doneTask"
          category="Done"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
