<template>
    <div class="flex flex-col items-center justify-center">
        <component :is="currentCat" v-if="isBreakActive" />
        <BreakButton :is-break-active="isBreakActive" @toggle="emit('toggle')" />
    </div>
</template>

<script setup lang="ts">
import CatSleeping from "~/components/shared/cat/Sleeping.vue";
import CatCoffee from "~/components/shared/cat/Coffee.vue";
import type { DefineComponent } from "vue";

defineProps<{
    isBreakActive: boolean;
}>();

const emit = defineEmits<{
    (e: "toggle"): void;
}>();

const breakComponents = [CatSleeping, CatCoffee];

const getRandomIndex = (arr: Array<DefineComponent>) => {
  if (arr.length <= 0) {
    return 0;
  }

  return Math.floor(Math.random() * arr.length);
};

const currentCat = shallowRef(breakComponents.at(getRandomIndex(breakComponents)));
</script>

<style scoped>

</style>