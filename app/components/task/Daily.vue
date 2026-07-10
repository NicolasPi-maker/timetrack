<template>
  <div class="p-6 border-b">
    <header class="flex items-center">
      <h2 class="text-muted flex-1 text-base font-normal uppercase">
        Aujourd'hui
      </h2>
      <p>3h42m</p>
    </header>
    <ul class="flex flex-col gap-2 my-2">
      <li
        v-for="task in tasks"
        :key="task.name"
        class="flex items-center gap-2 p-4 rounded-xl"
        :class="task.sessions[0].endTime ? '' : 'bg-surface'"
      >
        <div class="flex-1 flex gap-4 items-center">
          <StatusIndicator :active="!task.endTime" pulsed size="small" />
          <h4>{{ task.name }}</h4>
        </div>
        <p :class="task.endTime ? '' : 'text-accent'" class="hidden md:flex">
          {{ formatTime(task.startTime) }}
          ->
          {{ task.endTime ? formatTime(task.endTime) : "en cours" }}
        </p>
        <p v-if="task.endTime">
          {{ formatDuration(task.startTime, task.endTime) }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "~/interfaces";
import StatusIndicator from "../shared/StatusIndicator.vue";

const tasks = defineModel<Array<Task>>();

const displayedTasks = computed<
  Array<{
    name: string;
    startTime: Date;
    endTime: Date | null;
    active: boolean;
  }>
>(() => {
  let arr = <any>[];

  if (tasks.value) {
    arr = tasks.value.map((task) => {
      const lastSession =
        task.sessions.length > 0
          ? task.sessions[task.sessions.length - 1]
          : null;

      return {
        name: task.name,
        startTime: lastSession?.startTime,
        endTime: lastSession?.endTime,
        active: !!lastSession?.endTime,
      };
    });
  }

  return arr;
});

const formatTime = (date: Date) =>
  date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const formatDuration = (start: Date, end: Date) => {
  const totalMinutes = Math.round((end.getTime() - start.getTime()) / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return hours > 0
    ? `${hours}h${String(minutes).padStart(2, "0")}m`
    : `${minutes}m`;
};
</script>

<style scoped></style>
