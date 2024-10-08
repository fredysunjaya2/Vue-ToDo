<script setup>
import { ref, reactive, inject } from 'vue';

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

const taskTitle = ref("");

const taskNewTitle = ref(props.taskOldTitle);

const emit = defineEmits([
    'addTask',
    'emitToParentUpdateTask',
]);

const addTaskRequest = () => {
    if (formValid) {
        emit('addTask', taskTitle.value);

        isDialogShown.value = false;
        taskTitle.value = "";
    }
}

/**
 * dengan cara emit tetapi dalam complex nested component akan sulit karena emit hanya naik 1 step ke parentnya sehingga 
 * akan terlalu banyak passing estafet dari deep child ke rootnya
 */

// const updateTaskRequest = () => {
//     if (formValid) {
//         emit('emitToParentUpdateTask', props.taskItem, taskNewTitle.value);

//         isDialogShown.value = false;
//         taskTitle.value = "";
//     }
// }


/**
 * dengan cara provide dan inject sehingga mencegah passing estafet
 */
const { updateTask } = inject('task')

const updateTaskRequest = () => {
    if (formValid) {
        updateTask(props.taskItem, taskNewTitle.value)

        isDialogShown.value = false;
        taskTitle.value = "";
    }
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
                                    @submit.prevent="taskOldTitle === '' ? addTaskRequest() : updateTaskRequest()"
                                    v-model="formValid">
                                    <v-text-field v-if="taskOldTitle === ''" clearable placeholder="Type Task" type="text"
                                        v-model="taskTitle" :rules="rules.taskRules">
                                    </v-text-field>
                                    <v-text-field v-else clearable placeholder="Type Task" type="text"
                                        v-model="taskNewTitle" :rules="rules.taskRules">
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