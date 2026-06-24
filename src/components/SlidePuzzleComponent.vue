<template>
  <div class="slide-puzzle-wrap">
    <transition name="fade">
      <div v-if="solved" class="puzzle-solved-banner">
        ✦ Geweldig — de afbeelding is compleet!
      </div>
    </transition>

    <draggable
      v-model="pieces"
      item-key="correctPosition"
      class="puzzle-grid"
      :animation="180"
      ghost-class="ghost"
      :move="canMove"
      @end="checkSolution"
    >
      <template #item="{ element }">
        <div
          class="piece-wrapper"
          :class="{ 'piece-locked': isLocked(element) }"
        >
          <img :src="element.imageUrl" class="piece-img" draggable="false" />
          <button
            class="lock-btn"
            @mousedown.stop
            @click.stop="toggleLock(element)"
            :title="isLocked(element) ? 'Klik om te ontgrendelen' : 'Klik om te vergrendelen'"
          >{{ isLocked(element) ? '🔒' : '🔓' }}</button>
        </div>
      </template>
    </draggable>

    <div class="puzzle-controls">
      <button class="btn-hint" @click="showHint = !showHint">
        {{ showHint ? 'Verberg voorbeeld' : 'Toon voorbeeld' }}
      </button>
      <span v-if="locked.length > 0" class="lock-info">
        {{ locked.length }} stukje{{ locked.length === 1 ? '' : 's' }} vergrendeld
      </span>
    </div>

    <transition name="fade">
      <div v-if="showHint && !solved" class="hint-grid">
        <img
          v-for="p in orderedPieces"
          :key="p.correctPosition"
          :src="p.imageUrl"
          class="hint-piece"
          draggable="false"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

interface Piece {
  imageUrl: string
  correctPosition: number
}

const emit = defineEmits<{ 'puzzle-solved': [] }>()

const orderedPieces: Piece[] = [
  { imageUrl: '/images/Puzzle/Grieksegoden_r1_c1.jpg', correctPosition: 0 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r1_c2.jpg', correctPosition: 1 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r1_c3.jpg', correctPosition: 2 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r1_c4.jpg', correctPosition: 3 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r1_c5.jpg', correctPosition: 4 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r1_c6.jpg', correctPosition: 5 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r2_c1.jpg', correctPosition: 6 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r2_c2.jpg', correctPosition: 7 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r2_c3.jpg', correctPosition: 8 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r2_c4.jpg', correctPosition: 9 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r2_c5.jpg', correctPosition: 10 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r2_c6.jpg', correctPosition: 11 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r3_c1.jpg', correctPosition: 12 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r3_c2.jpg', correctPosition: 13 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r3_c3.jpg', correctPosition: 14 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r3_c4.jpg', correctPosition: 15 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r3_c5.jpg', correctPosition: 16 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r3_c6.jpg', correctPosition: 17 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r4_c1.jpg', correctPosition: 18 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r4_c2.jpg', correctPosition: 19 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r4_c3.jpg', correctPosition: 20 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r4_c4.jpg', correctPosition: 21 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r4_c5.jpg', correctPosition: 22 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r4_c6.jpg', correctPosition: 23 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r5_c1.jpg', correctPosition: 24 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r5_c2.jpg', correctPosition: 25 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r5_c3.jpg', correctPosition: 26 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r5_c4.jpg', correctPosition: 27 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r5_c5.jpg', correctPosition: 28 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r5_c6.jpg', correctPosition: 29 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r6_c1.jpg', correctPosition: 30 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r6_c2.jpg', correctPosition: 31 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r6_c3.jpg', correctPosition: 32 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r6_c4.jpg', correctPosition: 33 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r6_c5.jpg', correctPosition: 34 },
  { imageUrl: '/images/Puzzle/Grieksegoden_r6_c6.jpg', correctPosition: 35 },
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const pieces = ref<Piece[]>(shuffle(orderedPieces))
const solved = ref(false)
const showHint = ref(false)
const locked = ref<number[]>([])

function isLocked(piece: Piece): boolean {
  return locked.value.includes(piece.correctPosition)
}

function toggleLock(piece: Piece) {
  const idx = locked.value.indexOf(piece.correctPosition)
  if (idx >= 0) locked.value.splice(idx, 1)
  else locked.value.push(piece.correctPosition)
}

function canMove(evt: any): boolean | void {
  const dragged = evt.draggedContext?.element as Piece | undefined
  const target = evt.relatedContext?.element as Piece | undefined
  if (dragged && isLocked(dragged)) return false
  if (target && isLocked(target)) return false
  return true
}

function checkSolution() {
  const isSolved = pieces.value.every((p, i) => p.correctPosition === i)
  if (isSolved) {
    solved.value = true
    emit('puzzle-solved')
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap');

.slide-puzzle-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem 2rem;
}

.puzzle-solved-banner {
  background: rgba(20, 83, 45, 0.7);
  border: 1px solid rgba(34, 197, 94, 0.5);
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  color: #bbf7d0;
  font-family: 'Cinzel', serif;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  width: 100%;
  max-width: 620px;
  text-align: center;
}

.puzzle-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3px;
  max-width: 620px;
  width: 100%;
  border: 2px solid rgba(201, 168, 76, 0.25);
  border-radius: 6px;
  padding: 3px;
  background: rgba(201, 168, 76, 0.04);
}

.piece-wrapper {
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 2px;
  position: relative;
  cursor: grab;
  transition: transform 0.1s;
}
.piece-wrapper:hover { transform: scale(1.04); z-index: 2; }
.piece-wrapper:hover .lock-btn { opacity: 1; }
.piece-wrapper.piece-locked {
  cursor: default;
  outline: 2px solid rgba(201, 168, 76, 0.7);
  outline-offset: -2px;
}
.piece-wrapper.piece-locked .lock-btn { opacity: 1; }

.piece-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  user-select: none;
  pointer-events: none;
}

.lock-btn {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 18px;
  height: 18px;
  font-size: 10px;
  line-height: 1;
  border: none;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.65);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}
.lock-btn:hover { background: rgba(0, 0, 0, 0.85); }

.ghost {
  opacity: 0.2;
  border: 2px dashed rgba(201, 168, 76, 0.6);
  border-radius: 2px;
}

.puzzle-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-hint {
  background: transparent;
  color: #c9a84c;
  border: 1px solid rgba(201, 168, 76, 0.3);
  padding: 0.45rem 1.1rem;
  border-radius: 4px;
  font-family: 'Cinzel', serif;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  opacity: 0.65;
  transition: opacity 0.2s;
}
.btn-hint:hover { opacity: 1; }

.lock-info {
  font-family: 'Cinzel', serif;
  font-size: 0.65rem;
  color: #c9a84c;
  opacity: 0.55;
  letter-spacing: 0.08em;
}

.hint-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2px;
  max-width: 210px;
  border: 1px solid rgba(201, 168, 76, 0.2);
  border-radius: 4px;
  padding: 2px;
  opacity: 0.8;
}
.hint-piece {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
  border-radius: 1px;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
