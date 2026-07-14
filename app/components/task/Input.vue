<template>
  <div class="p-6 border-b">
    <fieldset class="flex flex-col gap-2">
      <div class="flex items-center">
        <span class="text-accent font-bold text-xl mr-2">></span>
        <input
          v-model="text"
          type="text"
          class="flex-1 border-0 bg-transparent outline-0 px-1"
          @keyup.enter="handleEnterKeyPress(text)"
          @keydown.tab.prevent="handleTabKeyPress"
        />
      </div>
      <small class="text-sm text-muted">
        entrée pour démarrer · tab pour autocompléter une activité connue
      </small>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/interfaces';

const props = defineProps<{
  tasks: Task[];
}>();

const taskNames = computed(() => {
  return props.tasks.map((task) => task.name);
});

const getCommonPrefix = (strings: string[]) => {
  return strings.reduce((prefix, str) => {
    let i = 0;
    while (i < prefix.length && str[i] === prefix[i]) i++;
    return prefix.slice(0, i);
  });
};

const handleTabKeyPress = () => {
  const match = text.value.match(/^([^"]*")(.*)$/);
  if (!match) return;

  const [, prefix = "", fragment = ""] = match;
  const matchingTasks = taskNames.value.filter((name) => startsWithIgnoreCase(name, fragment));
  if (matchingTasks.length === 0) return;

  if (matchingTasks.length === 1) {
    text.value = `${prefix}${matchingTasks[0]}"`;
    return;
  }

  text.value = `${prefix}${getCommonPrefix(matchingTasks)}`;
};

const text = ref("");

const getCommand = (str: string) => {
  const index = str.indexOf('"');
  return (index === -1 ? str : str.slice(0, index)).trim();
};

const getTask = (str: string) => {
  const match = str.match(/"(.*)"/);
  return match?.[1] ?? "";
};

const error = ref<string | null>(null);

const resetStates = () => {
  text.value = "";
  error.value = null;
};

const handleEnterKeyPress = (text: string) => {
  resetStates();

  const command = getCommand(text);
  const task = getTask(text);

  switch (command) {
    case "start":
      emit("start", task);
      break;
    case "stop":
      emit("stop", task);
      break;
    case "remove":
      emit("remove", task);
      break;
    default:
      error.value = "Invalid command";
      break;
  }
};

const emit = defineEmits({
  start: (task) => task,
  stop: (task) => task,
  remove: (task) => task
});
</script>

<style scoped>
input {
  caret-color: var(--color-accent);
  caret-shape: block;
}
</style>
