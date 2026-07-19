<template>
  <div class="flex flex-col flex-1">
    <header>
      <TaskInput
        :tasks="tasks"
        @start="handleStart"
        @stop="handleStop"
        @remove="handleRemove"
        @break="toggleBreak"
      />
    </header>
    <main class="flex-1 flex flex-col">
      <div class="flex justify-center gap-2 py-4">
        <button
          v-for="(view, index) in views"
          :key="view.key"
          class="px-3 py-1 text-sm rounded-full transition-colors"
          :class="activeView === index ? 'bg-accent text-bg' : 'text-muted'"
          @click="activeView = index"
        >
          {{ view.label }}
        </button>
      </div>
      <div class="overflow-hidden flex-1" @touchstart="onTouchStart" @touchend="onTouchEnd">
        <SharedCatIdle v-if="!activeTask" />
        <div
          class="flex h-full transition-transform duration-300 ease-out"
          :style="{ transform: `translateX(-${activeView * 100}%)` }"
        >
          <div class="w-full shrink-0">
            <TaskDaily :date="new Date()" :tasks="tasks" @set-active="handleStart($event)" />
          </div>
          <div class="w-full shrink-0">
            <TaskWeekly :tasks="weeklyTasks" />
          </div>
        </div>
      </div>
    </main>
    <Transition>
      <Overlay v-if="isBreakActive">
        <Break :is-break-active="isBreakActive" @toggle="toggleBreak" />
      </Overlay>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import Overlay from "~/components/shared/Overlay.vue";
import type { Session, Task } from "~/interfaces";

interface TaskDto {
  id: string;
  name: string;
  sessions: { startTime: string; endTime: string | null }[];
}

const { data } = await useFetch<TaskDto[]>("/api/tasks");
const { data: weeklyData } = await useFetch<Array<{ date: string; tasks: Array<TaskDto> }>>("/api/tasks/week");


const tasks = computed<Task[]>(() =>
  (data.value ?? []).map((task: TaskDto) => {
    return formatTask(task);
  }),
);

const weeklyTasks = computed(() => {
  return (weeklyData.value ?? []).map((day: { date: string; tasks: Array<TaskDto> }) => {
    return {
      date: day.date,
      tasks: day.tasks.map((task: TaskDto) => formatTask(task)),
    };
  });
});

const formatTask = (task: TaskDto) => {
  return {
    id: task.id,
    name: task.name,
    sessions: task.sessions.map((session) => ({
      startTime: new Date(session.startTime),
      endTime: session.endTime ? new Date(session.endTime) : null,
    })),
  };
};

const views = [
  { key: "daily", label: "Jour" },
  { key: "weekly", label: "Semaine" },
];
const activeView = ref(0);

const touchStartX = ref<number | null>(null);
const swipeThreshold = 50;

const onTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0]?.clientX ?? null;
};

const onTouchEnd = (event: TouchEvent) => {
  if (touchStartX.value === null) return;

  const deltaX = (event.changedTouches[0]?.clientX ?? touchStartX.value) - touchStartX.value;
  touchStartX.value = null;

  if (deltaX <= -swipeThreshold && activeView.value < views.length - 1) {
    activeView.value++;
  } else if (deltaX >= swipeThreshold && activeView.value > 0) {
    activeView.value--;
  }
};

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
  const tmpActive = findActiveTask(tasks.value);
  
  if (tmpActive && equalsIgnoreCase(tmpActive.name, taskName)) {
    return handleStop(taskName);
  } else {
    const updated = await $fetch<TaskDto>("/api/tasks/start", {
      method: "POST",
      body: { name: taskName },
    });
    if(data.value) {
      upsertTask(updated);
    }

    if (tmpActive) await handleStop(tmpActive.name);
  }
};

const handleStop = async (taskName: string) => {
  const updated = await $fetch<TaskDto>("/api/tasks/stop", {
    method: "POST",
    body: { name: taskName },
  });
  if(data.value) {
    upsertTask(updated);
  }
};

const handleRemove = async (arr: Ref<Array<TaskDto>>, taskName: string) => {
  const { id } = await $fetch<{ id: string }>("/api/tasks/remove", {
    method: "POST",
    body: { name: taskName },
  });
  arr.value = (arr.value ?? []).filter((t) => t.id !== id);
};

const isBreakActive = computed(() => {
  return activeTask.value?.name === 'Pause';
});

const toggleBreak = () => {
    if (isBreakActive.value) {
        // Stop break
        handleStop('Pause');
      } else {
        // Start break
        handleStart('Pause');
    }
};
</script>

<style scoped>

.v-enter-from, .v-leave-to {
  opacity: 0;
}
.v-enter-to, .v-leave-from {
  opacity: 1;
}
.v-enter-active, .v-leave-active {
  transition: opacity 0.5s;
}
</style>
