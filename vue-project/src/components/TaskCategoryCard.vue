<script setup>
import { ref, reactive } from 'vue';
import AddTaskDialog from '@/components/AddTaskDialog.vue';

const props = defineProps({
    cardColor: {
        type: String,
    },
    ongoingTask: {
        type: Array,
    }
});

const emit = defineEmits({
    markTask: 'markTask',
    deleteTask: 'deleteTask',
    updateTask: 'updateTask',
})


</script>

<template>
    <v-card class="mx-auto mt-8" :color="cardColor">
        <v-card-item class="pt-3 pb-6">
            <v-card-title class="py-0 pt-3">
                <p>Ongoing</p>
            </v-card-title>
            <v-list :bg-color="cardColor" class="border-t-lg">
                <v-list-item v-for="( item, index ) in  ongoingTask " :key="item.id" :value="item.id" class="border-b-md"
                    @click="$emit('markTask', item, index)">
                    <div class="d-flex justify-space-between align-center">
                        <p>{{ item.name }}</p>
                        <div>
                            <v-btn variant="tonal" icon="$mdiPencil">
                                <v-icon icon="$mdiPencil"></v-icon>
                                <AddTaskDialog :task-old-title="item.name" :task-item="item" />
                            </v-btn>
                            <v-btn variant="tonal" icon="$mdiClose" @click="$emit('deleteTask', item)"></v-btn>
                        </div>
                    </div>
                </v-list-item>
            </v-list>
        </v-card-item>
    </v-card>
</template>