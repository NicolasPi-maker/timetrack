<template>
  <div class="flex flex-col items-center gap-3 py-10 select-none">
    <div class="speech-bubble px-4 py-3 rounded-lg max-w-xs text-center">
      <p class="text-accent font-semibold">Enfin, du repos.</p>
      <p class="text-muted text-sm">
        Chut... je recharge. Reviens quand t'es prêt.
      </p>
    </div>

    <svg
      viewBox="0 0 240 260"
      class="w-40 h-auto"
      role="img"
      aria-label="Chat noir endormi avec des Z qui flottent au-dessus de sa tête"
    >
      <ellipse cx="120" cy="245" rx="70" ry="8" fill="var(--color-bg)" opacity="0.5" />

      <!-- Les Z, hors du groupe qui respire pour flotter indépendamment -->
      <g class="zzz" fill="var(--color-accent)" font-family="monospace" font-weight="700">
        <text class="z1" x="150" y="72" font-size="15">z</text>
        <text class="z2" x="165" y="54" font-size="21">z</text>
        <text class="z3" x="182" y="34" font-size="29">Z</text>
      </g>

      <g class="cat-asleep">
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

        <!-- Yeux fermés : arcs souriants (u u) -->
        <g fill="none" stroke="var(--color-accent)" stroke-width="4" stroke-linecap="round">
          <path d="M 84 106 Q 98 117 112 106" />
          <path d="M 128 106 Q 142 117 156 106" />
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
      </g>
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

.cat-asleep {
  transform-origin: 120px 240px;
  animation: breathe 3.5s ease-in-out infinite;
}

.cat-tail {
  transform-origin: 178px 190px;
  animation: tail-sway 5s ease-in-out infinite;
}

/* Chaque Z part de sa position, monte et s'estompe, en décalé */
.zzz text {
  transform-box: fill-box;
  transform-origin: center;
  animation: zzz-float 3s ease-in-out infinite;
  opacity: 0;
}
.zzz .z1 { animation-delay: 0s; }
.zzz .z2 { animation-delay: 1s; }
.zzz .z3 { animation-delay: 2s; }

@keyframes breathe {
  0%, 100% { transform: scaleY(1) translateY(0); }
  50% { transform: scaleY(1.02) translateY(-2px); }
}

@keyframes tail-sway {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-5deg); }
}

@keyframes zzz-float {
  0% { opacity: 0; transform: translateY(6px) scale(0.8); }
  30% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-22px) scale(1.1); }
}

@media (prefers-reduced-motion: reduce) {
  .cat-asleep,
  .cat-tail,
  .zzz text {
    animation: none;
  }
  /* Sans animation, on laisse au moins les Z visibles */
  .zzz text { opacity: 1; }
}
</style>
