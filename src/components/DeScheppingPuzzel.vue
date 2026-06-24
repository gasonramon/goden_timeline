<template>
  <div class="puzzle-wrap">

    <!-- God guide hint -->
    <div v-if="guide" class="guide-bar" :style="{ '--sec': guide.theme.secondary, '--pri': guide.theme.primary }">
      <span class="guide-name">{{ guide.name }}</span>
      <p class="guide-hint">"{{ guide.guideText_minigame_1 }}"</p>
    </div>

    <div class="puzzle-header">
      <h2 class="puzzle-title">De Schepping — Breng de volgorde in orde</h2>
      <p class="puzzle-sub">
        Sleep elke naam naar de juiste plek in de scheppingsketen. Wat ontstond er als eerste?
      </p>
    </div>

    <!-- Success -->
    <transition name="fade">
      <div v-if="solved" class="success-banner">
        <span>✓ Juist! Zo ontstond de wereld van de Grieken.</span>
        <button class="next-btn" @click="router.push('/godentijd')">
          Naar de Godentijd →
        </button>
      </div>
    </transition>

    <div class="puzzle-body">

      <!-- Bank -->
      <div class="bank-section">
        <p class="section-label">Te plaatsen</p>
        <VueDraggable
            v-model="bank"
            group="schepping"
            item-key="id"
            class="bank-list"
            :animation="180"
            ghost-class="ghost"
            @end="onDrop"
          >
            <template #item="{ element }">
              <div
                class="chip"
                :style="{ '--c': element.color }"
              >
                {{ element.name }}
              </div>
            </template>
          </VueDraggable>
        <p v-if="bank.length === 0" class="bank-empty">Alle namen geplaatst!</p>
      </div>

      <!-- Chain -->
      <div class="chain">
        <div
          v-for="(slot, index) in slots"
          :key="slot.id"
          class="chain-row"
        >
          <!-- Connector arrow (not on first) -->
          <div v-if="index > 0" class="arrow">↓</div>

          <div class="slot-wrap">
            <span class="slot-label">{{ slot.label }}</span>
              <VueDraggable
                v-model="slot.placed"
                group="schepping"
                item-key="id"
                class="drop-zone"
                :animation="180"
                ghost-class="ghost"
                @end="onDrop"
              >
                <template #item="{ element }">
                  <div
                    class="chip placed"
                    :class="{ wrong: showErrors && element.id !== slot.correctId }"
                    :style="{ '--c': element.color }"
                  >
                    {{ element.name }}
                  </div>
                </template>
              </VueDraggable>
            <span v-if="slot.placed.length === 0" class="drop-hint">Sleep hier</span>
          </div>

          <p class="slot-desc">{{ slot.desc }}</p>
        </div>
      </div>

    </div>

    <div class="actions">
      <button class="btn-check" @click="checkAndReveal">Controleer</button>
      <button class="btn-reset" @click="reset">Opnieuw</button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import VueDraggable from 'vuedraggable'
import { getGodById } from '../assets/gods'

const router = useRouter()

// ── Guide ─────────────────────────────────────────────────────────────────────
const guide = computed(() => {
  const id = localStorage.getItem('chosenGodId')
  return id ? getGodById(id) : null
})

// ── Puzzle data ───────────────────────────────────────────────────────────────
interface Piece { id: string; name: string; color: string }
interface Slot  { id: string; label: string; desc: string; correctId: string; placed: Piece[] }

const allPieces: Piece[] = [
  { id: 'chaos',      name: 'Chaos',      color: '#94a3b8' },
  { id: 'gaia',       name: 'Gaia',       color: '#84cc16' },
  { id: 'tartarus',   name: 'Tartarus',   color: '#7c3aed' },
  { id: 'eros',       name: 'Eros',       color: '#f43f5e' },
  { id: 'nyx',        name: 'Nyx',        color: '#818cf8' },
  { id: 'uranus',     name: 'Uranus',     color: '#38bdf8' },
  { id: 'kronos',     name: 'Kronos',     color: '#f97316' },
  { id: 'zeus',       name: 'Zeus',       color: '#f5c518' },
]

const slots = reactive<Slot[]>([
  {
    id: 's-chaos',
    label: '1 — Het allereerste begin',
    desc: 'Voor alles was er enkel leegte en duisternis.',
    correctId: 'chaos',
    placed: [],
  },
  {
    id: 's-gaia',
    label: '2 — De aarde ontwaakt',
    desc: 'Uit het niets rees de aarde omhoog — de grond van alle leven.',
    correctId: 'gaia',
    placed: [],
  },
  {
    id: 's-tartarus',
    label: '3 — De diepste diepte',
    desc: 'Diep onder de aarde gaapt een bodemloze afgrond.',
    correctId: 'tartarus',
    placed: [],
  },
  {
    id: 's-eros',
    label: '4 — De kracht van verbinding',
    desc: 'De oerkracht die alles aantrekt en doet groeien.',
    correctId: 'eros',
    placed: [],
  },
  {
    id: 's-nyx',
    label: '5 — De nacht',
    desc: 'Uit het duister van Chaos verscheen de godin van de nacht.',
    correctId: 'nyx',
    placed: [],
  },
  {
    id: 's-uranus',
    label: '6 — De hemel',
    desc: 'Gaia baarde de sterrenhemel die haar omhulde.',
    correctId: 'uranus',
    placed: [],
  },
  {
    id: 's-kronos',
    label: '7 — De eerste heerser',
    desc: 'De machtigste Titan, zoon van Gaia en Uranus, regeerde over al het bestaande.',
    correctId: 'kronos',
    placed: [],
  },
  {
    id: 's-zeus',
    label: '8 — De nieuwe orde',
    desc: 'Kronos\' eigen zoon versloeg hem en bracht een nieuw tijdperk: de Olympus.',
    correctId: 'zeus',
    placed: [],
  },
])

function shuffleArr<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const bank = ref<Piece[]>(shuffleArr([...allPieces]))


const solved   = ref(false)
const showErrors = ref(false)

function onDrop() {
  showErrors.value = false

  for (const slot of slots) {
    while (slot.placed.length > 1) {
      const extra = slot.placed.pop()
      if (extra) bank.value.push(extra)
    }
  }

  const allFilled = slots.every(s => s.placed.length === 1)

  if (!allFilled) {
    solved.value = false
    return
  }

  solved.value = slots.every(
    s => s.placed[0].id === s.correctId
  )
}

function checkAndReveal() {
  showErrors.value = true
  onDrop()
}


function reset() {
  solved.value     = false
  showErrors.value = false
  const returned: Piece[] = []
  for (const slot of slots) {
    returned.push(...slot.placed)
    slot.placed = []
  }
  bank.value = shuffleArr([...bank.value, ...returned])
}
</script>

<style scoped>
.puzzle-wrap {
  padding: 0 0 4rem;
  font-family: 'Georgia', serif;
  color: #e8e0d0;
}

/* Guide bar */
.guide-bar {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.7rem 1.5rem;
  background: color-mix(in srgb, var(--pri, #1a1a2e) 80%, #000);
  border-bottom: 1px solid color-mix(in srgb, var(--sec, #f5c518) 25%, transparent);
  flex-wrap: wrap;
}
.guide-name {
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--sec, #f5c518);
  white-space: nowrap;
  flex-shrink: 0;
}
.guide-hint {
  font-size: 0.88rem;
  font-style: italic;
  opacity: 0.75;
  margin: 0;
}

/* Header */
.puzzle-header {
  padding: 1.75rem 1.5rem 0.75rem;
}
.puzzle-title {
  font-size: clamp(1.2rem, 3vw, 1.7rem);
  color: #f5c518;
  margin: 0 0 0.3rem;
}
.puzzle-sub {
  font-size: 0.9rem;
  opacity: 0.6;
  font-style: italic;
  margin: 0;
}

/* Success */
.success-banner {
  margin: 0.75rem 1.5rem;
  background: #14532d;
  border: 1px solid #22c55e;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  color: #dcfce7;
}
.next-btn {
  background: #22c55e;
  color: #000;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 7px;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
}

/* Body */
.puzzle-body {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 2rem;
  padding: 1.25rem 1.5rem;
  align-items: start;
}
@media (max-width: 640px) {
  .puzzle-body { grid-template-columns: 1fr; }
}

/* Bank */
.section-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.4;
  margin: 0 0 0.5rem;
}
.bank-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 32px;
}
.bank-empty {
  font-size: 0.78rem;
  opacity: 0.35;
  font-style: italic;
}

/* Chips */
.chip {
  padding: 0.45rem 0.9rem;
  border-radius: 6px;
  background: color-mix(in srgb, var(--c) 22%, #141424);
  border: 1.5px solid color-mix(in srgb, var(--c) 70%, transparent);
  color: var(--c);
  font-size: 0.88rem;
  font-weight: bold;
  cursor: grab;
  user-select: none;
  transition: box-shadow 0.15s;
  white-space: nowrap;
}
.chip:hover {
  box-shadow: 0 0 10px color-mix(in srgb, var(--c) 35%, transparent);
}
.chip:active { cursor: grabbing; }
.chip.wrong {
  border-color: #ef4444;
  background: #3b0000;
  color: #fca5a5;
  animation: shake 0.3s ease;
}
.ghost { opacity: 0.3; }

@keyframes shake {
  0%,100% { transform: translateX(0); }
  30%      { transform: translateX(-5px); }
  70%      { transform: translateX(5px); }
}

/* Chain */
.chain {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.chain-row {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
.arrow {
  font-size: 1.2rem;
  opacity: 0.3;
  padding: 0 0 0 1.25rem;
  line-height: 1;
  margin: -0.25rem 0 0.1rem;
  align-self: center;
  /* sits between rows */
  width: 0;
  position: relative;
  left: -0.5rem;
}
.slot-wrap {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 160px;
}
.slot-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  opacity: 0.4;
}
.drop-zone {
  min-height: 38px;
  min-width: 140px;
  border: 1px dashed #ffffff22;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  position: relative;
  transition: border-color 0.15s, background 0.15s;
}
.drop-zone:hover {
  border-color: #ffffff44;
  background: #ffffff06;
}
.drop-hint {
  font-size: 0.62rem;
  opacity: 0.2;
  font-style: italic;
  pointer-events: none;
  position: absolute;
}
.slot-desc {
  font-size: 0.8rem;
  opacity: 0.5;
  font-style: italic;
  margin: 0.15rem 0 0.75rem;
  line-height: 1.4;
  max-width: 340px;
}

/* Actions */
.actions {
  display: flex;
  gap: 1rem;
  padding: 0 1.5rem;
  justify-content: flex-start;
}
.btn-check {
  background: #f5c518;
  color: #0d0d1a;
  border: none;
  padding: 0.6rem 1.75rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-check:hover { opacity: 0.85; }
.btn-reset {
  background: transparent;
  color: #e8e0d0;
  border: 1px solid #ffffff25;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  opacity: 0.55;
  transition: opacity 0.2s;
}
.btn-reset:hover { opacity: 1; }

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.35s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>