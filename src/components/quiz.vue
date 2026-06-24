<template>
  <div class="quiz-wrap">

    <!-- God guide hint -->
    <div v-if="guide" class="guide-bar" :style="{ '--sec': guide.theme.secondary, '--pri': guide.theme.primary }">
      <span class="guide-name">{{ guide.name }}</span>
      <p class="guide-hint">"{{ guide.guideText_minigame_3 }}"</p>
    </div>

    <!-- Header -->
    <div class="quiz-header">
      <p class="quiz-eyebrow">Opdracht III</p>
      <h2 class="quiz-title">De Helden Tijd</h2>
      <p class="quiz-sub">Beantwoord de vragen over de grote helden van Griekenland!</p>
    </div>

    <!-- Questions -->
    <div v-if="!finished" class="questions-area">
      <div class="progress-bar-wrap">
        <div class="progress-bar" :style="{ width: progressPct + '%' }"></div>
      </div>
      <p class="progress-label">Vraag {{ currentIndex + 1 }} van {{ questions.length }}</p>

      <transition name="slide" mode="out-in">
        <div class="question-card" :key="currentIndex">
          <p class="question-text">{{ currentQuestion.question }}</p>

          <div class="answers-grid">
            <button
              v-for="(option, i) in currentQuestion.options"
              :key="i"
              class="answer-btn"
              :class="{
                correct: answered && i === currentQuestion.correctIndex,
                wrong: answered && chosen === i && i !== currentQuestion.correctIndex,
                idle: !answered,
              }"
              :disabled="answered"
              @click="answer(i)"
            >
              <span class="answer-letter">{{ ['A', 'B', 'C', 'D'][i] }}</span>
              <span class="answer-text">{{ option }}</span>
            </button>
          </div>

          <transition name="fade">
            <div v-if="answered" class="feedback">
              <span v-if="chosen === currentQuestion.correctIndex" class="feedback-correct">✦ Goed zo!</span>
              <span v-else class="feedback-wrong">
                Het goede antwoord is: <strong>{{ currentQuestion.options[currentQuestion.correctIndex] }}</strong>
              </span>
              <button class="btn-next" @click="nextQuestion">
                {{ currentIndex < questions.length - 1 ? 'Volgende vraag →' : 'Bekijk resultaat →' }}
              </button>
            </div>
          </transition>
        </div>
      </transition>
    </div>

    <!-- Result screen (before victory) -->
    <transition name="fade">
      <div v-if="finished" class="result-screen">
        <div class="result-icon">{{ correctCount >= questions.length * 0.8 ? '🏆' : correctCount >= questions.length * 0.5 ? '⭐' : '💪' }}</div>
        <h3 class="result-title">
          {{ correctCount >= questions.length * 0.8 ? 'Geweldig!' : correctCount >= questions.length * 0.5 ? 'Goed gedaan!' : 'Volhouden!' }}
        </h3>
        <p class="result-text">
          Je hebt {{ correctCount }} van de {{ questions.length }} vragen goed beantwoord.
        </p>
        <div class="stars">
          <span v-for="i in 5" :key="i" :class="{ lit: i <= Math.round((correctCount / questions.length) * 5) }">★</span>
        </div>
        <button class="btn-victory" @click="router.push('/victory')">
          Voltooi de tijdlijn →
        </button>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getGodById } from '../assets/gods'

const router = useRouter()

const guide = computed(() => {
  const id = localStorage.getItem('chosenGodId')
  return id ? getGodById(id) : null
})

interface Question {
  question: string
  options: string[]
  correctIndex: number
}

const allQuestions: Question[] = [
  {
    question: 'Wie versloeg de vreselijke Minotaurus in het labyrint?',
    options: ['Heracles', 'Theseus', 'Perseus', 'Odysseus'],
    correctIndex: 1,
  },
  {
    question: 'Welk wapen gebruikte Zeus om zijn vijanden te verslaan?',
    options: ['Een drietand', 'Een boog en pijl', 'Een bliksemschicht', 'Een zwaard'],
    correctIndex: 2,
  },
  {
    question: 'Welke held zwierf 10 jaar over zee voordat hij thuiskwam?',
    options: ['Achilles', 'Heracles', 'Jason', 'Odysseus'],
    correctIndex: 3,
  },
  {
    question: 'Wie versloeg de slangenhaar Medusa met hulp van een magisch schild?',
    options: ['Theseus', 'Bellerophon', 'Perseus', 'Heracles'],
    correctIndex: 2,
  },
  {
    question: 'Wat was de zwakke plek van de grote held Achilles?',
    options: ['Zijn knie', 'Zijn hiel', 'Zijn schouder', 'Zijn hand'],
    correctIndex: 1,
  },
  {
    question: 'Wie was de moeder van de Olympische goden?',
    options: ['Hera', 'Demeter', 'Rhea', 'Athena'],
    correctIndex: 2,
  },
  {
    question: 'Wat droeg Hermes altijd aan zijn voeten?',
    options: ['Sandalen met vleugels', 'Gouden laarzen', 'Zilveren zolen', 'Blote voeten'],
    correctIndex: 0,
  },
  {
    question: 'Welk dier was het heilige dier van de godin Athena?',
    options: ['Een adelaar', 'Een uil', 'Een slang', 'Een leeuw'],
    correctIndex: 1,
  },
  {
    question: 'Wie hield de hemel omhoog op zijn schouders?',
    options: ['Kronos', 'Poseidon', 'Atlas', 'Heracles'],
    correctIndex: 2,
  },
  {
    question: 'Hoe heette het beroemde schip van Jason en zijn vrienden?',
    options: ['De Odyssee', 'De Argo', 'De Hermes', 'De Troje'],
    correctIndex: 1,
  },
  {
    question: 'Welke god was de heerser van de Onderwereld?',
    options: ['Zeus', 'Poseidon', 'Ares', 'Hades'],
    correctIndex: 3,
  },
  {
    question: 'Wat stal Prometheus van de goden en gaf hij aan de mensen?',
    options: ['Goud', 'Vuur', 'Water', 'Wijsheid'],
    correctIndex: 1,
  },
  {
    question: 'Hoe heette het vliegende paard van de held Bellerophon?',
    options: ['Pegasus', 'Centaur', 'Feniks', 'Cyclops'],
    correctIndex: 0,
  },
  {
    question: 'Welke held voltooide de beroemde twaalf werken?',
    options: ['Theseus', 'Perseus', 'Heracles', 'Achilles'],
    correctIndex: 2,
  },
  {
    question: 'Hoe heette de god van de zee en aardbevingen?',
    options: ['Zeus', 'Hades', 'Poseidon', 'Apollo'],
    correctIndex: 2,
  },
]

function pickRandom(arr: Question[], n: number): Question[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

const questions = pickRandom(allQuestions, 6)

const currentIndex = ref(0)
const answered = ref(false)
const chosen = ref<number | null>(null)
const correctCount = ref(0)
const finished = ref(false)

const currentQuestion = computed(() => questions[currentIndex.value])
const progressPct = computed(() => (currentIndex.value / questions.length) * 100)

function answer(i: number) {
  if (answered.value) return
  chosen.value = i
  answered.value = true
  if (i === currentQuestion.value.correctIndex) correctCount.value++
}

function nextQuestion() {
  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++
    answered.value = false
    chosen.value = null
  } else {
    finished.value = true
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap');

.quiz-wrap {
  font-family: 'Cinzel', serif;
  color: #e8d8a0;
  min-height: 60vh;
}

/* Guide bar */
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

/* Header */
.quiz-header {
  padding: 2rem 1.5rem 1rem;
  border-bottom: 1px solid rgba(201, 168, 76, 0.12);
  margin-bottom: 1.5rem;
}
.quiz-eyebrow {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #c9a84c;
  opacity: 0.6;
  margin: 0 0 0.4rem;
}
.quiz-title {
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #f0d98a;
  margin: 0 0 0.4rem;
}
.quiz-sub {
  font-size: 0.8rem;
  font-family: Georgia, serif;
  opacity: 0.55;
  font-style: italic;
}

/* Progress */
.questions-area { padding-bottom: 2rem; }
.progress-bar-wrap {
  height: 3px;
  background: rgba(201, 168, 76, 0.1);
  border-radius: 2px;
  margin: 0 1.5rem 0.4rem;
}
.progress-bar {
  height: 100%;
  background: #c9a84c;
  border-radius: 2px;
  transition: width 0.4s ease;
}
.progress-label {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #c9a84c;
  opacity: 0.45;
  margin: 0 1.5rem 1.5rem;
}

/* Question */
.question-card { padding: 0 1.5rem; }
.question-text {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #f0d98a;
  line-height: 1.5;
  margin: 0 0 1.5rem;
  font-weight: 600;
}

/* Answers */
.answers-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}
@media (max-width: 540px) { .answers-grid { grid-template-columns: 1fr; } }

.answer-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-radius: 6px;
  border: 1px solid rgba(201, 168, 76, 0.2);
  background: rgba(201, 168, 76, 0.04);
  color: #e8d8a0;
  font-family: 'Cinzel', serif;
  font-size: 0.85rem;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s, border-color 0.2s, transform 0.1s;
}
.answer-btn.idle:hover {
  background: rgba(201, 168, 76, 0.12);
  border-color: rgba(201, 168, 76, 0.5);
  transform: translateY(-2px);
}
.answer-btn:disabled { cursor: default; }
.answer-btn.correct { background: rgba(20,83,45,0.7); border-color: rgba(34,197,94,0.6); color: #bbf7d0; }
.answer-btn.wrong   { background: rgba(59,7,7,0.7);   border-color: rgba(239,68,68,0.5);  color: #fca5a5; }

.answer-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: rgba(201,168,76,0.12);
  border: 1px solid rgba(201,168,76,0.25);
  font-size: 0.65rem;
  font-weight: 700;
  color: #c9a84c;
  flex-shrink: 0;
}
.answer-text { flex: 1; }

/* Feedback */
.feedback {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 6px;
  background: rgba(10,8,4,0.5);
  border: 1px solid rgba(201,168,76,0.1);
  flex-wrap: wrap;
}
.feedback-correct { color: #86efac; font-size: 0.9rem; }
.feedback-wrong   { color: #fca5a5; font-size: 0.85rem; font-family: Georgia, serif; font-style: italic; }
.btn-next {
  margin-left: auto;
  background: #c9a84c;
  color: #0a0800;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  font-family: 'Cinzel', serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s;
}
.btn-next:hover { opacity: 0.85; }

/* Result screen */
.result-screen {
  text-align: center;
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.result-icon { font-size: 4rem; animation: pop 0.5s ease; }
.result-title { font-size: clamp(1.5rem,4vw,2rem); color: #f0d98a; }
.result-text  { font-family: Georgia, serif; font-size: 1rem; line-height: 1.6; opacity: 0.75; max-width: 380px; }
.stars        { font-size: 2rem; letter-spacing: 0.15em; color: rgba(201,168,76,0.2); }
.stars span.lit { color: #f5c518; }

.btn-victory {
  background: #c9a84c;
  color: #0a0800;
  border: none;
  padding: 0.85rem 2.5rem;
  border-radius: 6px;
  font-family: 'Cinzel', serif;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  margin-top: 0.5rem;
}
.btn-victory:hover { opacity: 0.85; transform: translateY(-2px); }

@keyframes pop {
  0%   { transform: scale(0.5); opacity: 0; }
  70%  { transform: scale(1.2); }
  100% { transform: scale(1);   opacity: 1; }
}

/* Transitions */
.fade-enter-active,  .fade-leave-active  { transition: opacity 0.3s; }
.fade-enter-from,    .fade-leave-to      { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: opacity 0.25s, transform 0.25s; }
.slide-enter-from { opacity: 0; transform: translateX(30px); }
.slide-leave-to   { opacity: 0; transform: translateX(-30px); }
</style>
