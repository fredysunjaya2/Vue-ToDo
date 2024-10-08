<script setup>
import { ref, reactive, updated } from 'vue';

const taskTitle = ref("");
let formValid = false;
const isDialogShown = ref(false);

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

const props = defineProps({
    taskOldTitle: {
        type: String,
        default: "",
    },
    taskItem: {
        type: Object,
    }
});

const emit = defineEmits({
    addTask: 'addTask',
});

const addTaskRequest = () => {
    if (formValid) {
        emit('addTask', formValid, taskTitle.value);

        isDialogShown.value = false;
        taskTitle.value = "";
    }
}

const updateTaskRequest = () => {
    if (formValid) {
        emit('updateTask', formValid, taskItem, taskTitle.value);

        isDialogShown.value = false;
        taskTitle.value = "";
    }
}

updated() {
    this.renderCount++;
    console.log('Updated ' + this.renderCount + ' times.')
  }

</script>

<template>
    <v-dialog persistent width="50%" v-model="isDialogShown" activator="parent">
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
                                <v-form validate-on="input lazy"
                                    @submit.prevent="taskOldTitle !== '' ? addTaskRequest() : updateTaskRequest()"
                                    v-model="formValid">
                                    <v-text-field clearable placeholder="Type Task" type="text" v-model="taskTitle"
                                        :rules="rules.taskRules">
                                    </v-text-field>
                                    <v-btn v-if="taskOldTitle === ''" type="submit">
                                        Add
                                    </v-btn>
                                    <v-btn v-else type="submit">
                                        Confirm
                                    </v-btn>
                                    <v-btn @click="isDialogShown = false;">
                                        Cancel
                                    </v-btn>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </template>
    </v-dialog>
</template>