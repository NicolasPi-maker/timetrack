<template>
  <div>
    <TaskInput
      :tasks="tasks"
      @start="handleStart"
      @stop="handleStop"
      @remove="handleRemove"
    />
    <!-- <component :is="cat" /> -->
    <TaskCatIdle v-if="!activeTask" />
    <TaskDaily :tasks="tasks" @set-active="handleStart($event)" />
  </div>
</template>

<script setup lang="ts">
import type { Session, Task } from "~/interfaces";
import CatSleeping from "@/components/task/cat/Sleeping.vue";
import CatCoffee from "@/components/task/cat/Coffee.vue";
import type { DefineComponent } from "vue";

interface TaskDto {
  id: string;
  name: string;
  sessions: { startTime: string; endTime: string | null }[];
}

const breakComponents = [CatSleeping, CatCoffee];

const getRandomIndex = (arr: Array<DefineComponent>) => {
  if (arr.length <= 0) {
    return 0;
  }

  return Math.floor(Math.random() * arr.length);
};

const cat = shallowRef(breakComponents.at(getRandomIndex(breakComponents)));

const { data } = await useFetch<TaskDto[]>("/api/tasks");

const tasks = computed<Task[]>(() =>
  (data.value ?? []).map((task) => ({
    id: task.id,
    name: task.name,
    sessions: task.sessions.map((session) => ({
      startTime: new Date(session.startTime),
      endTime: session.endTime ? new Date(session.endTime) : null,
    })),
  })),
);

const isSessionActive = (session: Session) => session.endTime === null;

const activeTask = computed(() => findActiveTask(tasks.value));

const findActiveTask = (tasks: Array<Task>) => {
  return tasks.find((task) => {
    const lastSession = task.sessions.at(-1);
    return lastSession && isSessionActive(lastSession);
  });
};

const upsertTask = (task: TaskDto) => {
  const list = data.value ?? [];
  const index = list.findIndex((t) => t.id === task.id);
  data.value =
    index === -1
      ? [...list, task]
      : list.map((t, i) => (i === index ? task : t));
};

const handleStart = async (taskName: string) => {
  const active = findActiveTask(tasks.value);
  if (active && equalsIgnoreCase(active.name, taskName))
    return handleStop(taskName);
  if (active) await handleStop(active.name);

  const updated = await $fetch<TaskDto>("/api/tasks/start", {
    method: "POST",
    body: { name: taskName },
  });
  upsertTask(updated);
};

const handleStop = async (taskName: string) => {
  const updated = await $fetch<TaskDto>("/api/tasks/stop", {
    method: "POST",
    body: { name: taskName },
  });
  upsertTask(updated);
};

const handleRemove = async (taskName: string) => {
  const { id } = await $fetch<{ id: string }>("/api/tasks/remove", {
    method: "POST",
    body: { name: taskName },
  });
  data.value = (data.value ?? []).filter((t) => t.id !== id);
};
</script>

<style scoped></style>
