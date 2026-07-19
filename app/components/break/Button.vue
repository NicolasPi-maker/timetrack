<template>
    <div>
        <button ref="toggleBreak" class="break-btn p-2" :class="{ 'is-active': isBreakActive }" @click="emit('toggle')" >
            <svg
                viewBox="0 0 100 100"
                class="cup"
                role="img"
                aria-label="Tasse de café"
            >
                <g class="steam" fill="none" stroke="var(--color-muted)" stroke-width="4" stroke-linecap="round">
                    <path class="s1" d="M 38 40 q -6 -9 0 -16 q 6 -7 0 -15" />
                    <path class="s2" d="M 50 40 q 6 -9 0 -16 q -6 -7 0 -15" />
                    <path class="s3" d="M 62 40 q -6 -9 0 -16 q 6 -7 0 -15" />
                </g>

                <path
                    d="M 72 46 q 18 3 18 19 q 0 16 -18 19"
                    fill="none"
                    stroke="var(--color-border)"
                    stroke-width="6"
                    stroke-linecap="round"
                />
                <path
                    d="M 22 44 L 27 84 Q 28 90 34 90 L 66 90 Q 72 90 73 84 L 78 44 Z"
                    fill="var(--color-surface)"
                    stroke="var(--color-border)"
                    stroke-width="4"
                    stroke-linejoin="round"
                />
                <ellipse cx="50" cy="44" rx="28" ry="6" fill="var(--color-surface)" stroke="var(--color-border)" stroke-width="4" />
                <ellipse cx="50" cy="44" rx="22" ry="4" fill="var(--color-accent)" />
            </svg>
            <span class="text-accent">{{ isBreakActive ? 'Reprendre' : 'Se mettre en pause' }}</span>
        </button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    isBreakActive: boolean;
}>();

const emit = defineEmits<{
    (e: "toggle"): void;
}>();

const toggleBreak = ref<HTMLButtonElement | null>(null);

watch(() => toggleBreak.value, () => {
    toggleBreak.value?.focus();
});
</script>

<style scoped>
.break-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
}

.cup {
    width: 4rem;
    height: 4rem;
}

.steam path {
    transform-box: fill-box;
    transform-origin: bottom center;
    opacity: 0;
}

.break-btn:hover .steam path,
.break-btn.is-active .steam path {
    animation: steam-rise 2.4s ease-in-out infinite;
}

.steam .s1 { animation-delay: 0s; }
.steam .s2 { animation-delay: 0.8s; }
.steam .s3 { animation-delay: 1.6s; }

@keyframes steam-rise {
    0% { opacity: 0; transform: translateY(4px) scaleY(0.85); }
    40% { opacity: 0.6; }
    100% { opacity: 0; transform: translateY(-12px) scaleY(1.1); }
}

@media (prefers-reduced-motion: reduce) {
    .steam path {
        animation: none !important;
        opacity: 0.5;
    }
}
</style>