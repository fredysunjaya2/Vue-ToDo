<script setup>
import { ref, reactive, inject } from 'vue';
import AddTaskDialog from '@/components/AddTaskDialog.vue';
import moment from 'moment';
import axios from 'axios';

/**
 * Penggunaan Props
 */
const props = defineProps({
    cardColor: {
        type: String,
    },
    ongoingTask: {
        type: Array,
    },
    category: {
        type: String,
    }
});

/**
 * Penggunaan declaration emits
 */
const emit = defineEmits([
    'markTask',
    'deleteTask',
    'updateTask',
])

const emitToParentUpdateTask = (item, taskTitle) => {
    emit('updateTask', item, taskTitle);
}

const markTask = async (item) => {
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

        getTasks();
    } catch (error) {
        console.log(error)
    }
}

const { getTasks } = inject('task');

</script>

<template>
    <v-card class="mx-auto mt-8" :color="cardColor">
        <v-card-item class="pt-3 pb-6">
            <v-card-title class="py-0 pt-3">
                <p>{{ category }}</p>
            </v-card-title>
            <v-list :bg-color="cardColor" class="border-t-lg">
                <!-- <v-list-item v-for="( item, index ) in  ongoingTask " :key="item.id" :value="item.id" class="border-b-md"
                    @click="$emit('markTask', item)"> -->
                <v-list-item v-for="( item, index ) in  ongoingTask " :key="item.id" :value="item.id" class="border-b-md"
                    @click="markTask(item)">
                    <div class="d-flex justify-space-between align-center">
                        <p>{{ item.name }}</p>
                        <p>{{ moment(item.createdAt).format("ddd, Do MMM YYYY") }}</p>
                        <div>
                            <v-btn variant="tonal" icon="$mdiPencil">
                                <v-icon icon="$mdiPencil"></v-icon>
                                <AddTaskDialog :task-old-title="item.name" :task-item="item"
                                    @emit-to-parent-update-task="emitToParentUpdateTask" />
                            </v-btn>
                            <v-btn variant="tonal" icon="$mdiClose" @click="$emit('deleteTask', $event, item);"></v-btn>
                        </div>
                    </div>
                </v-list-item>
            </v-list>
        </v-card-item>
    </v-card>
</template>