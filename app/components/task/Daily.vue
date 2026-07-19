<template>
  <div class="px-6 py-4 border-b">
    <header class="flex items-center">
      <h2 class="text-muted flex-1 text-base font-normal uppercase">
        {{ currentDay(date) }}
      </h2>
      <p>{{ totalDuration }}</p>
    </header>
    <section> 
      <ul class="flex flex-col gap-2 my-2">
        <li
          v-for="task in tasks"
          :key="task.id"
        >
          <TaskCard :task="task" :active="isActiveTask(task)" @set-active="emit('set-active', task.name)" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "~/interfaces";

const props = defineProps<{
  date: Date;
  tasks: Array<Task>;
}>();

const isActiveTask = (task: Task): boolean => {
  const lastSession = task.sessions.at(-1);
  return lastSession !== undefined && lastSession.endTime === null;
};

const totalDuration = computed(() =>
  formatDurationFromMinutes(getTotalDuration(props.tasks.flatMap((task) => task.sessions)))
);

const emit = defineEmits<{
  (e: "set-active", taskName: string): void;
}>();

const currentDay = (date: Date) => {
  if (!date) return "";

  const isToday = date.toDateString() === new Date().toDateString();
  return isToday ? "Aujourd'hui" : formatDay(date);
};
</script>

<style scoped></style>
