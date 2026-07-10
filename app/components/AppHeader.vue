<template>
  <header class="p-6 border-b">
    <div class="flex">
      <h1 class="text-muted text-base flex-1 flex gap-2 items-baseline">
        <StatusIndicator pulsed />timetrack
      </h1>
      <span class="flex gap-2 items-center">
        <StatusIndicator size="large" />
        <Clock />
      </span>
    </div>
  </header>
</template>

<script setup>
import Clock from "./shared/Clock.vue";
import StatusIndicator from "./shared/StatusIndicator.vue";

const currDate = ref(new Date());

let interval;
onBeforeMount(() => {
  interval = setInterval(() => {
    currDate.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped></style>
