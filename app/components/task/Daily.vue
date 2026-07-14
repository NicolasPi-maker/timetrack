<template>
  <div class="p-6 border-b">
    <header class="flex items-center">
      <h2 class="text-muted flex-1 text-base font-normal uppercase">
        Aujourd'hui
      </h2>
      <p>{{ totalDuration }}</p>
    </header>
    <ul class="flex flex-col gap-2 my-2">
      <li
        v-for="task in tasks"
        :key="task.id"
      >
        <TaskCard :task="task" :active="isActiveTask(task)" @set-active="emit('set-active', task.name)" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "~/interfaces";

const props = defineProps<{
  tasks: Array<Task>;
}>();

const isActiveTask = (task: Task): boolean => {
  const lastSession = task.sessions.at(-1);
  return lastSession !== undefined && lastSession.endTime === null;
};

const totalDuration = computed(() =>
  getTotalDuration(props.tasks.flatMap((task) => task.sessions))
);

const emit = defineEmits<{
  (e: "set-active", taskName: string): void;
}>();
</script>

<style scoped></style>
