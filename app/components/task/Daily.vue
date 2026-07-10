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
        :class="task.endTime ? '' : 'bg-surface'"
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
import StatusIndicator from "../shared/StatusIndicator.vue";

const at = (hours: number, minutes: number) => {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

// simule la forme des données telles qu'elles arriveront de la base (colonnes `text`)
const tasks = [
  {
    name: "Dev backend",
    startTime: at(15, 20),
    endTime: null,
  },
  {
    name: "Réunion équipe",
    startTime: at(10, 30),
    endTime: at(11, 15),
  },
  {
    name: "Review PR",
    startTime: at(9, 50),
    endTime: at(10, 25),
  },
];

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
