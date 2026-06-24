<template>
  <Timeline />
  <div class="page-wrap">
    <!-- God guide hint -->
    <div v-if="guide" class="guide-bar" :style="{ '--sec': guide.theme.secondary, '--pri': guide.theme.primary }">
      <span class="guide-name">{{ guide.name }}</span>
      <p class="guide-hint">"{{ guide.guideText_minigame_2 }}"</p>
    </div>

    <div class="page-header">
      <p class="page-eyebrow">Opdracht II</p>
      <h2 class="page-title">De Goden Tijd</h2>
      <p class="page-sub">Sleep de stukjes op de juiste plek om de afbeelding te herstellen!</p>
    </div>

    <transition name="fade">
      <div v-if="solved" class="success-banner">
        <span>✦ Geweldig — de afbeelding is hersteld!</span>
        <button class="next-btn" @click="router.push('/heldentijd')">Naar de Heldentijd →</button>
      </div>
    </transition>

    <SlidePuzzleComponent @puzzle-solved="solved = true" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Timeline from '../components/Timeline.vue'
import SlidePuzzleComponent from '../components/SlidePuzzleComponent.vue'
import { getGodById } from '../assets/gods'

const router = useRouter()
const solved = ref(false)

const guide = computed(() => {
  const id = localStorage.getItem('chosenGodId')
  return id ? getGodById(id) : null
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap');

.page-wrap {
  font-family: 'Cinzel', serif;
  color: #e8d8a0;
}

.guide-bar {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.65rem 1.5rem;
  background: color-mix(in srgb, var(--pri, #1a1a2e) 85%, #000);
  border-bottom: 1px solid color-mix(in srgb, var(--sec, #c9a84c) 25%, transparent);
  flex-wrap: wrap;
}
.guide-name {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--sec, #c9a84c);
  white-space: nowrap;
}
.guide-hint {
  font-size: 0.82rem;
  font-style: italic;
  opacity: 0.7;
  font-family: Georgia, serif;
}

.page-header {
  padding: 2rem 1.5rem 1rem;
  border-bottom: 1px solid rgba(201, 168, 76, 0.12);
  margin-bottom: 1rem;
}
.page-eyebrow {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #c9a84c;
  opacity: 0.6;
  margin: 0 0 0.4rem;
}
.page-title {
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #f0d98a;
  margin: 0 0 0.4rem;
}
.page-sub {
  font-size: 0.8rem;
  font-family: Georgia, serif;
  opacity: 0.55;
  font-style: italic;
}

.success-banner {
  margin: 0 1.5rem 0.5rem;
  background: rgba(20, 83, 45, 0.6);
  border: 1px solid rgba(34, 197, 94, 0.4);
  border-radius: 4px;
  padding: 0.9rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  color: #bbf7d0;
  font-size: 0.82rem;
  letter-spacing: 0.05em;
}
.next-btn {
  background: #c9a84c;
  color: #0a0800;
  border: none;
  padding: 0.45rem 1.1rem;
  border-radius: 3px;
  font-family: 'Cinzel', serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s;
}
.next-btn:hover { opacity: 0.85; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.35s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
