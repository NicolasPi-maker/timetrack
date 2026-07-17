<template>
  <div class="flex flex-col items-center gap-3 py-10 select-none">
    <div class="speech-bubble px-4 py-3 rounded-lg max-w-xs text-center">
      <p class="text-accent font-semibold">Pause café.</p>
      <p class="text-muted text-sm">
        Touche pas à ma tasse. Reviens plus tard.
      </p>
    </div>

    <svg
      viewBox="0 0 240 260"
      class="w-40 h-auto"
      role="img"
      aria-label="Chat noir tenant une tasse de café fumante d'un air méfiant"
    >
      <ellipse cx="120" cy="245" rx="70" ry="8" fill="var(--color-bg)" opacity="0.5" />

      <path
        class="cat-tail"
        d="M 178 190 C 215 190 225 130 195 100 C 180 85 165 100 175 115 C 190 135 185 165 160 175"
        fill="none"
        stroke="var(--color-border)"
        stroke-width="18"
        stroke-linecap="round"
      />

      <ellipse cx="120" cy="185" rx="72" ry="58" fill="var(--color-surface)" stroke="var(--color-border)" stroke-width="3" />

      <ellipse cx="95" cy="235" rx="16" ry="10" fill="var(--color-border)" />
      <ellipse cx="145" cy="235" rx="16" ry="10" fill="var(--color-border)" />

      <circle cx="120" cy="110" r="58" fill="var(--color-surface)" stroke="var(--color-border)" stroke-width="3" />

      <path d="M 75 75 L 60 25 L 105 65 Z" fill="var(--color-surface)" stroke="var(--color-border)" stroke-width="3" />
      <path d="M 165 75 L 180 25 L 135 65 Z" fill="var(--color-surface)" stroke="var(--color-border)" stroke-width="3" />
      <path d="M 78 68 L 68 40 L 95 63 Z" fill="var(--color-accent)" opacity="0.85" />
      <path d="M 162 68 L 172 40 L 145 63 Z" fill="var(--color-accent)" opacity="0.85" />

      <!-- Yeux méfiants, regard légèrement baissé vers la tasse -->
      <g class="cat-eyes" style="transform-origin: 120px 108px;">
        <ellipse cx="98" cy="108" rx="14" ry="18" fill="var(--color-accent)" />
        <ellipse cx="142" cy="108" rx="14" ry="18" fill="var(--color-accent)" />
        <rect x="95" y="102" width="6" height="22" rx="3" fill="var(--color-bg)" />
        <rect x="139" y="102" width="6" height="22" rx="3" fill="var(--color-bg)" />
      </g>

      <path d="M 114 128 L 126 128 L 120 137 Z" fill="var(--color-progress)" />
      <path
        d="M 120 137 Q 120 143 108 143 M 120 137 Q 120 143 132 143"
        fill="none"
        stroke="var(--color-muted)"
        stroke-width="2.5"
        stroke-linecap="round"
      />

      <g stroke="var(--color-muted)" stroke-width="2" stroke-linecap="round">
        <line x1="60" y1="118" x2="15" y2="110" />
        <line x1="60" y1="128" x2="15" y2="128" />
        <line x1="60" y1="138" x2="18" y2="146" />
        <line x1="180" y1="118" x2="225" y2="110" />
        <line x1="180" y1="128" x2="225" y2="128" />
        <line x1="180" y1="138" x2="222" y2="146" />
      </g>

      <!-- Vapeur : dessinée avant la tasse pour passer derrière le bord -->
      <g class="steam" fill="none" stroke="var(--color-muted)" stroke-width="3" stroke-linecap="round">
        <path class="s1" d="M 108 196 q -6 -9 0 -16 q 6 -7 0 -15" />
        <path class="s2" d="M 120 196 q 6 -9 0 -16 q -6 -7 0 -15" />
        <path class="s3" d="M 132 196 q -6 -9 0 -16 q 6 -7 0 -15" />
      </g>

      <!-- Tasse -->
      <path
        d="M 149 206 q 20 2 20 16 q 0 14 -20 16"
        fill="none"
        stroke="var(--color-border)"
        stroke-width="6"
        stroke-linecap="round"
      />
      <path
        d="M 94 200 L 100 234 Q 101 240 108 240 L 132 240 Q 139 240 140 234 L 146 200 Z"
        fill="var(--color-surface)"
        stroke="var(--color-border)"
        stroke-width="3"
        stroke-linejoin="round"
      />
      <ellipse cx="120" cy="200" rx="26" ry="6" fill="var(--color-surface)" stroke="var(--color-border)" stroke-width="3" />
      <ellipse cx="120" cy="200" rx="20" ry="4" fill="var(--color-accent)" />

      <!-- Pattes qui entourent la tasse -->
      <ellipse cx="100" cy="232" rx="11" ry="8" fill="var(--color-border)" />
      <ellipse cx="140" cy="232" rx="11" ry="8" fill="var(--color-border)" />
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.speech-bubble {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  position: relative;
}

.speech-bubble::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -8px;
  transform: translateX(-50%);
  border-width: 8px 8px 0 8px;
  border-style: solid;
  border-color: var(--color-surface) transparent transparent transparent;
}

.cat-tail {
  transform-origin: 178px 190px;
  animation: tail-sway 3.5s ease-in-out infinite;
}

.cat-eyes {
  animation: blink 5s ease-in-out infinite;
}

.steam path {
  transform-box: fill-box;
  transform-origin: bottom center;
  animation: steam-rise 2.4s ease-in-out infinite;
  opacity: 0;
}
.steam .s1 { animation-delay: 0s; }
.steam .s2 { animation-delay: 0.8s; }
.steam .s3 { animation-delay: 1.6s; }

@keyframes tail-sway {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-6deg); }
}

@keyframes blink {
  0%, 92%, 100% { transform: scaleY(1); }
  96% { transform: scaleY(0.1); }
}

@keyframes steam-rise {
  0% { opacity: 0; transform: translateY(4px) scaleY(0.85); }
  40% { opacity: 0.6; }
  100% { opacity: 0; transform: translateY(-12px) scaleY(1.1); }
}

@media (prefers-reduced-motion: reduce) {
  .cat-tail,
  .cat-eyes,
  .steam path {
    animation: none;
  }
  .steam path { opacity: 0.5; }
}
</style>
