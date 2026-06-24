<template>
  <div class="home-select">
    <div class="welcome-banner">
      <p class="banner-eyebrow">Griekse Mythologie Tijdlijn</p>
      <h1 class="banner-title">Kies jouw gids</h1>
      <p class="banner-sub">Welke god of godin neemt jou mee op reis door de Griekse mythologie?</p>
    </div>

    <div class="selector-layout">
      <div class="list-panel">
        <p class="panel-label">Alle goden</p>
        <ul class="god-list">
          <GodenListItem
            v-for="god in gods"
            :key="god.id"
            :god="god"
            :selected="selected?.id === god.id"
            @select="selectGod"
          />
        </ul>
      </div>

      <div class="detail-panel-wrap">
        <GodenDetailPanel :god="selected" @confirm="confirmGod" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { gods, type God } from '../assets/gods'
import GodenListItem from './GodenListItem.vue'
import GodenDetailPanel from './GodenDetailPanel.vue'

const router = useRouter()
const selected = ref<God | undefined>(undefined)

function selectGod(god: God) {
  selected.value = god
}

function confirmGod(god: God) {
  localStorage.setItem('chosenGodId', god.id)
  router.push('/schepping')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');

.home-select {
  font-family: 'Cinzel', serif;
  color: #e8d8a0;
  min-height: calc(100vh - 48px);
  background: radial-gradient(ellipse at top, #1a1025 0%, #0a0806 70%);
  padding-bottom: 3rem;
}

.welcome-banner {
  text-align: center;
  padding: 3rem 1.5rem 2rem;
  border-bottom: 1px solid rgba(201, 168, 76, 0.12);
  margin-bottom: 2rem;
}
.banner-eyebrow {
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #c9a84c;
  opacity: 0.6;
  margin: 0 0 0.75rem;
}
.banner-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #f0d98a;
  margin: 0 0 0.75rem;
  text-shadow: 0 0 40px rgba(201, 168, 76, 0.35);
}
.banner-sub {
  font-size: 0.9rem;
  font-family: Georgia, serif;
  font-style: italic;
  opacity: 0.55;
  margin: 0 auto;
  max-width: 440px;
  line-height: 1.6;
}

.selector-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 1.5rem;
  padding: 0 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  align-items: start;
}

@media (max-width: 700px) {
  .selector-layout { grid-template-columns: 1fr; }
}

.list-panel {
  position: sticky;
  top: 64px;
}
.panel-label {
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #c9a84c;
  opacity: 0.45;
  margin: 0 0 0.5rem;
}
.god-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(201, 168, 76, 0.25) transparent;
}
</style>
