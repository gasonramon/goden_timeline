<template>
  <div
    class="victory"
    :style="{ '--primary': godTheme.primary, '--secondary': godTheme.secondary, '--accent': godTheme.accent }"
  >
    <canvas ref="canvas" class="confetti-canvas" aria-hidden="true" />

    <div class="victory-content">
      <!-- God portrait -->
      <div class="v-portrait" v-if="god">
        <div class="v-glow"></div>
        <div class="v-ring">
          <div class="v-frame">
            <span class="v-emoji">{{ god.theme.emoji }}</span>
          </div>
        </div>
        <p class="v-god-name">{{ god.name }}</p>
      </div>

      <!-- Text -->
      <div class="v-text">
        <p class="v-eyebrow">Tijdlijn voltooid!</p>
        <h1 class="v-title">Jij bent een echte held!</h1>
        <p class="v-message" v-if="god">
          "{{ god.name }} is supertrots op jou. Je hebt de schepping,
          de goden en de helden van Griekenland ontdekt. Jij bent een
          echte ontdekkingsreiziger van de mythologie!"
        </p>
        <p class="v-message" v-else>
          Je hebt alle drie de puzzels opgelost. Jij bent een echte
          ontdekkingsreiziger van de Griekse mythologie!
        </p>

        <div class="v-trophies">
          <div class="v-trophy" v-for="t in ['🏆','⭐','🏺']" :key="t">{{ t }}</div>
        </div>

        <div class="v-badges">
          <div class="v-badge">✦ De Schepping</div>
          <div class="v-badge">✦ De Goden Tijd</div>
          <div class="v-badge">✦ De Helden Tijd</div>
        </div>

        <button class="v-restart" @click="restart">Speel opnieuw →</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getChosenGod } from '../assets/gods'

const router = useRouter()
const god = computed(() => getChosenGod())
const godTheme = computed(() => god.value?.theme ?? {
  primary: '#1a1a2e', secondary: '#f5c518', accent: '#fff',
  effect: 'lightning' as const, emoji: '✦',
})

function restart() {
  localStorage.removeItem('chosenGodId')
  router.push('/')
}

// ── Confetti canvas ───────────────────────────────────────────────────────────
const canvas = ref<HTMLCanvasElement | null>(null)
let animFrame: number

interface Particle {
  x: number; y: number; vx: number; vy: number
  size: number; life: number; maxLife: number
  color: string; rotation: number; rotSpeed: number
}

const particles: Particle[] = []
const colors = computed(() => [
  godTheme.value.secondary,
  godTheme.value.accent,
  '#f5c518', '#ffffff', '#c9a84c',
])

function spawnParticle(w: number, h: number) {
  const c = colors.value[Math.floor(Math.random() * colors.value.length)]
  particles.push({
    x: Math.random() * w,
    y: -10,
    vx: (Math.random() - 0.5) * 3,
    vy: Math.random() * 2.5 + 1,
    size: Math.random() * 8 + 4,
    life: 0,
    maxLife: 120 + Math.random() * 80,
    color: c,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.2,
  })
}

function drawConfetti() {
  const c = canvas.value
  if (!c) return
  const ctx = c.getContext('2d')!
  ctx.clearRect(0, 0, c.width, c.height)

  if (particles.length < 80) spawnParticle(c.width, c.height)

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.x += p.vx
    p.y += p.vy
    p.vy += 0.04
    p.rotation += p.rotSpeed
    p.life++

    const alpha = Math.max(0, 1 - p.life / p.maxLife)
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rotation)
    ctx.fillStyle = p.color
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
    ctx.restore()

    if (p.life >= p.maxLife || p.y > c.height + 10) particles.splice(i, 1)
  }

  animFrame = requestAnimationFrame(drawConfetti)
}

function resizeCanvas() {
  const c = canvas.value
  if (!c) return
  c.width  = c.offsetWidth
  c.height = c.offsetHeight
}

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  drawConfetti()
})

onUnmounted(() => {
  cancelAnimationFrame(animFrame)
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');

.victory {
  min-height: 100vh;
  background: radial-gradient(
    ellipse at center,
    color-mix(in srgb, var(--primary) 60%, #000) 0%,
    color-mix(in srgb, var(--primary) 85%, #000) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  font-family: 'Cinzel', serif;
  color: var(--accent);
  padding: 2rem;
}

.confetti-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.victory-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 700px;
  width: 100%;
}

@media (min-width: 640px) {
  .victory-content {
    flex-direction: row;
    align-items: flex-start;
    gap: 3rem;
  }
}

/* ── Portrait ── */
.v-portrait {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
  position: relative;
}

.v-glow {
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--secondary) 50%, transparent) 0%,
    transparent 70%
  );
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  pointer-events: none;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: translate(-50%, -55%) scale(1); opacity: 0.8; }
  50%       { transform: translate(-50%, -55%) scale(1.15); opacity: 1; }
}

.v-ring {
  padding: 5px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    var(--secondary),
    transparent 35%,
    color-mix(in srgb, var(--secondary) 70%, transparent) 55%,
    transparent 75%,
    var(--secondary)
  );
  animation: spin 6s linear infinite;
  position: relative;
  z-index: 1;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.v-frame {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--primary) 80%, #000);
  box-shadow:
    0 0 40px color-mix(in srgb, var(--secondary) 40%, transparent),
    inset 0 0 25px color-mix(in srgb, var(--secondary) 12%, transparent);
}

.v-emoji {
  font-size: 4.5rem;
  filter: drop-shadow(0 0 16px var(--secondary));
  animation: bounce 1.5s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}

.v-god-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--secondary);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-shadow: 0 0 15px color-mix(in srgb, var(--secondary) 50%, transparent);
}

/* ── Text ── */
.v-text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.v-eyebrow {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: var(--secondary);
  opacity: 0.7;
}

.v-title {
  font-size: clamp(1.8rem, 5vw, 2.8rem);
  font-weight: 700;
  color: var(--secondary);
  line-height: 1.1;
  text-shadow: 0 0 30px color-mix(in srgb, var(--secondary) 40%, transparent);
}

.v-message {
  font-family: Georgia, serif;
  font-style: italic;
  font-size: 1rem;
  line-height: 1.65;
  opacity: 0.82;
}

.v-trophies {
  display: flex;
  gap: 1.25rem;
}
.v-trophy {
  font-size: 2.5rem;
  animation: pop 0.5s ease both;
}
.v-trophy:nth-child(1) { animation-delay: 0.1s; }
.v-trophy:nth-child(2) { animation-delay: 0.25s; }
.v-trophy:nth-child(3) { animation-delay: 0.4s; }

@keyframes pop {
  0%   { transform: scale(0); opacity: 0; }
  70%  { transform: scale(1.3); }
  100% { transform: scale(1); opacity: 1; }
}

.v-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.v-badge {
  padding: 0.3rem 0.85rem;
  border-radius: 20px;
  border: 1px solid color-mix(in srgb, var(--secondary) 45%, transparent);
  background: color-mix(in srgb, var(--secondary) 10%, transparent);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--secondary);
}

.v-restart {
  align-self: flex-start;
  background: var(--secondary);
  color: var(--primary);
  border: none;
  padding: 0.85rem 2.25rem;
  border-radius: 8px;
  font-family: 'Cinzel', serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: opacity 0.2s, transform 0.15s;
  box-shadow: 0 4px 20px color-mix(in srgb, var(--secondary) 35%, transparent);
}
.v-restart:hover { opacity: 0.88; transform: translateY(-2px); }
</style>
