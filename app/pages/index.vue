<template>
  <div>
    <TaskInput @start="handleStart" @stop="handleStop" />
    <TaskDaily v-model="tasks" />
  </div>
</template>

<script setup lang="ts">
import type { Session, Task } from "~/interfaces";

const at = (hours: number, minutes: number) => {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

// simule la forme des données telles qu'elles arriveront de la base
const tasks = ref<Task[]>([
  {
    name: "Dev backend",
    sessions: [{ startTime: at(15, 20), endTime: null }],
  },
  {
    name: "Réunion équipe",
    sessions: [{ startTime: at(10, 30), endTime: at(11, 15) }],
  },
  {
    name: "Review PR",
    sessions: [{ startTime: at(9, 50), endTime: at(10, 25) }],
  },
]);

const isSessionActive = (session: Session) => session.endTime === null;

const handleStart = (taskName: string) => {
  const task = tasks.value.find((t) => t.name === taskName);

  if (!task) {
    tasks.value.push({
      name: taskName,
      sessions: [{ startTime: new Date(), endTime: null }],
    });
    return;
  }

  const lastSession = task.sessions.at(-1);
  if (lastSession && isSessionActive(lastSession)) return;

  task.sessions.push({ startTime: new Date(), endTime: null });
};

const handleStop = (taskName: string) => {
  const task = tasks.value.find((t) => t.name === taskName);
  if (!task) return;

  const lastSession = task.sessions.at(-1);
  if (!lastSession || !isSessionActive(lastSession)) return;

  lastSession.endTime = new Date();
};
</script>

<style scoped></style>
