<template>
  <section
    class="god-guide"
    :style="{
      '--primary': god.theme.primary,
      '--secondary': god.theme.secondary,
      '--accent': god.theme.accent,
    }"
  >
    <!-- Ambient background effect canvas -->
    <canvas ref="effectCanvas" class="effect-canvas" aria-hidden="true" />

    <div class="god-content">
      <div class="god-header">
        <span class="god-emoji">{{ god.theme.emoji }}</span>
        <div>
          <p class="god-title-label">{{ god.title }}</p>
          <h1 class="god-name">{{ god.name }}</h1>
          <p class="god-domain">{{ god.domain }}</p>
        </div>
      </div>

      <blockquote class="god-speech">
        "{{ god.intro }}"
      </blockquote>

      <p class="god-guide-text">{{ god.guideText }}</p>

      <div class="puzzle-hint" v-if="currentMinigame && guideForMinigame">
        <span class="puzzle-icon">🧩</span>
        <p>{{ guideForMinigame }}</p>
      </div>

      <div class="actions">
        <button class="btn-primary" @click="begin">
          Laten we beginnen →
        </button>
        <button class="btn-ghost" @click="$emit('change-god')">
          Andere gids kiezen
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getGodById, type God } from '../assets/gods'

const props = defineProps<{
  godId: string
  currentMinigame?: 1 | 2 | 3  // which tree puzzle is active
}>()

defineEmits(['change-god'])

const router = useRouter()

const god = computed<God>(() => {
  const found = getGodById(props.godId)
  if (!found) throw new Error(`Unknown god id: ${props.godId}`)
  return found
})

const guideForMinigame = computed(() => {
  if (!props.currentMinigame) return null
  return god.value[`guideText_minigame_${props.currentMinigame}` as keyof God] as string
})

function begin() {
  router.push('/schepping')
}

// ── Effect canvas ────────────────────────────────────────────────────────────
const effectCanvas = ref<HTMLCanvasElement | null>(null)
let animFrame: number

interface Particle {
  x: number; y: number; vx: number; vy: number
  size: number; life: number; maxLife: number; color: string
}

const particles: Particle[] = []

function spawnParticle(effect: string, w: number, h: number, color: string) {
  const base: Particle = {
    x: Math.random() * w, y: h + 10,
    vx: (Math.random() - 0.5) * 1.5,
    vy: -(Math.random() * 2 + 0.5),
    size: Math.random() * 4 + 2,
    life: 0, maxLife: 80 + Math.random() * 60,
    color,
  }

  switch (effect) {
    case 'lightning':
      base.x = Math.random() * w
      base.y = Math.random() * h * 0.4
      base.vy = Math.random() * 3 + 1
      base.vx = (Math.random() - 0.5) * 4
      base.maxLife = 15 + Math.random() * 10
      break
    case 'wave':
      base.y = h * 0.5 + (Math.random() - 0.5) * h * 0.4
      base.vx = Math.random() * 2 + 1
      base.vy = Math.sin(base.x / 30) * 0.5
      break
    case 'shadow':
      base.color = `hsla(270, 60%, 40%, 0.5)`
      base.vy = -(Math.random() * 1 + 0.2)
      break
    case 'love':
      base.vy = -(Math.random() * 1.5 + 0.5)
      base.vx = Math.sin(base.life / 10) * 0.8
      break
    default:
      break
  }
  particles.push(base)
}

function drawEffect(effect: string) {
  const canvas = effectCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!
  const { width: w, height: h } = canvas

  ctx.clearRect(0, 0, w, h)

  // Spawn new particles
  if (particles.length < 60) {
    spawnParticle(effect, w, h, god.value.theme.secondary)
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.x += p.vx
    p.y += p.vy
    p.life++

    // Wave oscillation
    if (effect === 'wave') p.vy = Math.sin((p.x + p.life) / 30) * 0.8

    // Love heart wobble
    if (effect === 'love') p.vx = Math.sin(p.life / 8) * 0.6

    const alpha = 1 - p.life / p.maxLife

    if (effect === 'lightning') {
      // Draw a short jagged line
      ctx.beginPath()
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(p.x + (Math.random() - 0.5) * 20, p.y + 10)
      ctx.strokeStyle = `rgba(255, 255, 200, ${alpha})`
      ctx.lineWidth = 1.5
      ctx.stroke()
    } else {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2)
      ctx.fillStyle = `${p.color}${Math.round(alpha * 80).toString(16).padStart(2, '0')}`
      ctx.fill()
    }

    if (p.life >= p.maxLife || p.y < -10 || p.x < -10 || p.x > w + 10) {
      particles.splice(i, 1)
    }
  }

  animFrame = requestAnimationFrame(() => drawEffect(effect))
}

function resizeCanvas() {
  const canvas = effectCanvas.value
  if (!canvas) return
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
}

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  drawEffect(god.value.theme.effect)
})

onUnmounted(() => {
  cancelAnimationFrame(animFrame)
  window.removeEventListener('resize', resizeCanvas)
})

watch(() => props.godId, () => {
  particles.length = 0
  cancelAnimationFrame(animFrame)
  drawEffect(god.value.theme.effect)
})
</script>

<style scoped>
.god-guide {
  position: relative;
  min-height: 100vh;
  background: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: 'Georgia', serif;
  color: var(--accent);
  padding: 2rem;
}

.effect-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.6;
}

.god-content {
  position: relative;
  z-index: 1;
  max-width: 640px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.god-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.god-emoji {
  font-size: 3.5rem;
  line-height: 1;
  filter: drop-shadow(0 0 12px var(--secondary));
}

.god-title-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.6;
  margin: 0;
}

.god-name {
  font-size: clamp(2rem, 6vw, 3rem);
  color: var(--secondary);
  margin: 0.1rem 0;
  text-shadow: 0 0 20px color-mix(in srgb, var(--secondary) 50%, transparent);
}

.god-domain {
  font-size: 0.9rem;
  font-style: italic;
  opacity: 0.7;
  margin: 0;
}

.god-speech {
  border-left: 3px solid var(--secondary);
  margin: 0;
  padding: 0.75rem 1.25rem;
  font-size: 1.1rem;
  line-height: 1.7;
  font-style: italic;
  background: color-mix(in srgb, var(--secondary) 8%, transparent);
  border-radius: 0 8px 8px 0;
}

.god-guide-text {
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.85;
  margin: 0;
}

.puzzle-hint {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  background: color-mix(in srgb, var(--secondary) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--secondary) 30%, transparent);
  border-radius: 10px;
  padding: 1rem 1.25rem;
}

.puzzle-icon {
  font-size: 1.4rem;
  flex-shrink: 0;
}

.puzzle-hint p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.btn-primary {
  background: var(--secondary);
  color: var(--primary);
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
}

.btn-primary:hover {
  opacity: 0.85;
  transform: translateY(-2px);
}

.btn-ghost {
  background: transparent;
  color: var(--accent);
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.btn-ghost:hover {
  opacity: 1;
}
</style>