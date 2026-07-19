<template>
    <div class="px-6 py-4  border-b">
        <header class="flex items-center">
            <h2 class="text-muted flex-1 text-base font-normal uppercase">
                Cette semaine
            </h2>
            <p>{{ totalDuration }}</p>
        </header>
        <section>
            <ul class="my-4 flex flex-col gap-3">
                <li v-for="task in mergedWeeklyTasks" :key="task.id" class="flex flex-col gap-1.5">
                    <div class="flex items-center justify-between">
                        <h3>{{ task.name }}</h3>
                        <p>{{ formatDurationFromMinutes(getTotalDuration(task.sessions)) }}</p>
                    </div>
                    <div class="h-1.5 rounded-full bg-border overflow-hidden">
                        <div class="h-full rounded-full bg-progress" :style="{ width: taskPercentage(task) + '%' }" />
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { Task } from '~/interfaces';

const props = defineProps<{
  tasks: Array<{date: string, tasks: Task[]}>;
}>();

const mergedWeeklyTasks = computed(() => mergeTasks(mergeDays(props.tasks)));

const mergeDays = (tasks: Array<{date: string, tasks: Task[]}>) => {
  return tasks.reduce((acc: Task[], curr: {date: string, tasks: Task[]}) => {
    acc = acc.concat(curr.tasks);
    return acc;
  }, []);
};

const mergeTasks = (tasks: Array<Task>) => {
    const hashMap = new Map<string, Task>();
    tasks.forEach(task => {
        if(!hashMap.has(task.name)) {
            hashMap.set(task.name, task);
        }
        else {
            const existingTask = hashMap.get(task.name);
            if(existingTask) {
                existingTask.sessions = existingTask.sessions.concat(task.sessions);
            }
        }
    });
    return Array.from(hashMap.values());
}

const totalMinutes = computed(() =>
  getTotalDuration(mergedWeeklyTasks.value.flatMap((task) => task.sessions))
);

const totalDuration = computed(() => formatDurationFromMinutes(totalMinutes.value));

const taskPercentage = (task: Task) => {
  if (totalMinutes.value === 0) return 0;
  return (getTotalDuration(task.sessions) / totalMinutes.value) * 100;
};
</script>

<style scoped>

</style>