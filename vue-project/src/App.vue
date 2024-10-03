<script setup>
import { ref, reactive, onBeforeUnmount, onMounted } from 'vue';
import tasks from '@/tasks.json'

const list = reactive(tasks);

const ongoingColor = ref("red-lighten-4");
const doneColor = ref("green-darken-2");

const ongoingTask = reactive([]);
const doneTask = reactive([]);

let taskTitle = ref("");
const formValid = ref(false);
const isDialogShown = ref(false);

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
  if (formValid.value) {

    const task = {
      id: Math.random().toString(16).slice(2),
      name: taskTitle.value,
      status: 'ongoing'
    }

    ongoingTask.push(task);

    isDialogShown.value = false;
    taskTitle.value = "";
  }
}

const rules = {
  taskRules: [
    (value) => {
      if (value) return true;

      return "Task can't be empty";
    },
    (value) => {
      if (value.length < 20) return true;

      return "Task Name can't be more than 20 characters"
    }
  ]
}

onBeforeUnmount(() => {
  alert('here');
});

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
        <v-dialog persistent width="50%" v-model="isDialogShown">
          <template v-slot:activator="{ props: activatorDialog }">
            <v-btn v-bind="activatorDialog" prepend-icon="$mdiPlus" variant="outlined" class="mx-auto">
              Add Task
            </v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card>
              <v-card-item>
                <v-card-title>
                  Add New Task
                </v-card-title>
              </v-card-item>
              <v-card-text>
                <v-container max-width="100%">
                  <v-row>
                    <v-col>
                      <v-form validate-on="input lazy" @submit.prevent="addTask();" v-model="formValid">
                        <v-text-field clearable placeholder="Type Task" type="text" v-model="taskTitle"
                          :rules="rules.taskRules">

                        </v-text-field>
                        <v-btn type="submit">
                          Add
                        </v-btn>
                      </v-form>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8">
        <v-card class="mx-auto mt-8" :color="ongoingColor">
          <v-card-item class="pt-3 pb-6">
            <v-card-title class="py-0 pt-3">
              <p>Ongoing</p>
            </v-card-title>
            <v-list :bg-color="ongoingColor" class="border-t-lg">
              <v-list-item v-for="( item, index ) in  ongoingTask " :key="item.id" :value="item.id" class="border-b-md"
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
          <v-card-item class="pt-3 pb-6">
            <v-card-title class="" py-0 pt-3>
              <p>Done</p>
            </v-card-title>
            <v-list :bg-color="doneColor" class="border-t-lg">
              <v-list-item v-for="( item, index ) in  doneTask " :key="item.id" :value="item.id" class="border-b-md"
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