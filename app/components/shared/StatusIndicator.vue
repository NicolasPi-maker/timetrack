<template>
  <div
    class="rounded-full indicator relative"
    :class="[
      pulsed ? 'pulsed' : '',
      active ? 'bg-accent' : 'bg-inactive',
      applySize(size),
    ]"
  ></div>
</template>

<script setup lang="ts">
defineProps({
  active: {
    type: Boolean,
    default: true,
  },
  pulsed: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    validator(value, _) {
      return ["small", "base", "large", "xl"].includes(value);
    },
    default: "base",
  },
});

const applySize = (size: string) => {
  switch (size) {
    case "small":
      return "w-1.5 h-1.5";
    case "base":
      return "w-2 h-2";
    case "large":
      return "w-3 h-3";
    case "xl":
      return "w-4 h-4";
    default:
      return "w-2 h-2";
  }
};
</script>

<style scoped>
.indicator.pulsed:before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: inherit;
  border-radius: 50%;
  animation: pulse 1s ease-in infinite;
  transform-origin: center;
  opacity: 20%;
  z-index: -1;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(1.5);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}
</style>
