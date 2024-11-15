<script setup>
import AddTaskDialog from "@/components/AddTaskDialog.vue";
import moment from "moment";
import { useTodosStore } from "@/stores/todos";
import { taskToast, taskConfirmation } from "@/composables/sweetalert.js";

/**
 * Penggunaan Props
 */
const props = defineProps({
  cardColor: {
    type: String,
  },
  tasks: {
    type: Array,
  },
  category: {
    type: String,
  },
});

const { markTask, deleteTask } = useTodosStore();

const updateMarkTask = (item) => {
  try {
    let newStatus = "";
    if (item.status === "ongoing") {
      newStatus = "done";
    } else {
      newStatus = "ongoing";
    }

    let payload = {
      status: newStatus,
    };

    markTask(item, payload);
  } catch (error) {
    console.log(error);
  }
};

const deleteExistingTask = (item) => {
  taskConfirmation
    .fire({
      titleText: "Are you sure to delete this task?",
    })
    .then((result) => {
      try {
        if (result.isConfirmed) {
          deleteTask(item);

          taskToast.fire({
            titleText: "Task Deleted Successfully!!!",
          });
        } else if (result.isDenied) {
          taskToast.fire({
            titleText: "Task Deletion is Cancelled",
            icon: "error",
            background: "#D50000",
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
};
</script>

<template>
  <v-card class="mx-auto mt-8" :color="cardColor">
    <v-card-item class="pt-3 pb-6">
      <v-card-title class="py-0 pt-3">
        <p>{{ category }}</p>
      </v-card-title>
      <v-list :bg-color="cardColor" class="border-t-lg">
        <v-list-item
          v-for="item in tasks"
          :key="item.id"
          :value="item.id"
          class="border-b-md"
          @click="updateMarkTask(item)"
        >
          <div class="d-flex justify-space-between align-center">
            <p>{{ item.name }}</p>
            <p>{{ moment(item.createdAt).format("ddd, Do MMM YYYY") }}</p>
            <div>
              <v-btn variant="tonal" icon="$mdiPencil">
                <v-icon icon="$mdiPencil"></v-icon>
                <AddTaskDialog :task-old-title="item.name" :task-item="item" />
              </v-btn>
              <v-btn
                variant="tonal"
                icon="$mdiClose"
                @click.stop="deleteExistingTask(item)"
              ></v-btn>
            </div>
          </div>
        </v-list-item>
      </v-list>
    </v-card-item>
  </v-card>
</template>

<style></style>
