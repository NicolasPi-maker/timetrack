<template>
    <div class="flex items-center gap-2 p-4 rounded-xl" :class="lastSession.endTime ? '' : 'bg-surface'" @click="emit('set-active', task.name)">
        <div class="flex-1 flex gap-4 items-center">
            <StatusIndicator :active="active" pulsed size="small" />
            <h4>{{ task.name }}</h4>
        </div>

        <div class="flex flex-col gap-1">
            <p :class="active ? 'text-accent' : ''" class="self-end">
                {{ getTotalDuration(task.sessions) }}
            </p>
            <p class="hidden md:flex items-center gap-1" :class="active ? 'text-accent' : ''">
                {{ formatTime(lastSession.startTime)}}  
                <Icon name="material-symbols:arrow-right-alt-rounded" class="text-xl" />
                {{ lastSession.endTime ? formatTime(lastSession.endTime) : 'en cours' }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Task, Session } from '~/interfaces';
import StatusIndicator from '../shared/StatusIndicator.vue';

const props = defineProps<{
    task: Task;
    active: boolean;
}>();

const lastSession = computed<Session>(
  () => {
    return props.task.sessions.at(-1);
  }
);

const emit = defineEmits<{
  (e: "set-active", taskName: string): void;
}>();
</script>

<style scoped>

</style>