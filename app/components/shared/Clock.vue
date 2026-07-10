<template>
  <header>
    <div>
      <p class="text-accent">
        {{ time }}
      </p>
    </div>
  </header>
</template>

<script setup>
const currDate = ref(new Date());

const time = computed(() =>
  currDate.value.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }),
);

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
