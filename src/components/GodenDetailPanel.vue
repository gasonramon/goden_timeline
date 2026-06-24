<template>
  <div class="detail-panel">
    <div v-if="!god" class="detail-empty">
      <span class="empty-star">✦</span>
      <p>Selecteer een god om meer te lezen.</p>
    </div>

    <div
      v-else
      class="detail-inner"
      :style="{
        '--primary': god.theme.primary,
        '--secondary': god.theme.secondary,
        '--accent': god.theme.accent,
      }"
    >
      <!-- Portrait -->
      <div class="god-portrait">
        <div class="portrait-glow"></div>
        <div class="portrait-ring">
          <div class="portrait-frame">
            <span class="portrait-emoji">{{ god.theme.emoji }}</span>
          </div>
        </div>
        <div class="portrait-footer">
          <p class="portrait-name">{{ god.name }}</p>
          <p class="portrait-domain">{{ god.domain }}</p>
        </div>
        <div class="portrait-lines">
          <div class="pline pline-1"></div>
          <div class="pline pline-2"></div>
        </div>
      </div>

      <!-- Text -->
      <div class="god-text">
        <p class="detail-label">{{ god.title }}</p>
        <h2 class="detail-name">{{ god.name }}</h2>
        <p class="detail-domain">{{ god.domain }}</p>
        <p class="detail-intro">{{ god.intro }}</p>
        <p class="detail-guide">{{ god.guideText }}</p>

        <button class="confirm-btn" @click="$emit('confirm', god)">
          Begin met {{ god.name }} →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { God } from '../assets/gods'

defineProps<{ god?: God }>()
defineEmits<{ confirm: [god: God] }>()
</script>

<style scoped>
.detail-panel {
  min-height: 340px;
  border-radius: 12px;
  border: 1px solid #ffffff12;
  background: #13132080;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.detail-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  opacity: 0.35;
  font-style: italic;
  font-size: 0.9rem;
  text-align: center;
  padding: 2rem;
  font-family: Georgia, serif;
}
.empty-star {
  font-size: 1.5rem;
  opacity: 0.4;
}

.detail-inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  min-height: 340px;
}

/* ── Portrait ── */
.god-portrait {
  width: 40%;
  flex-shrink: 0;
  background: linear-gradient(
    150deg,
    color-mix(in srgb, var(--primary) 80%, #000) 0%,
    color-mix(in srgb, var(--primary) 50%, #000) 100%
  );
  border-right: 1px solid color-mix(in srgb, var(--secondary) 20%, transparent);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem 1.5rem;
  gap: 1rem;
  position: relative;
  overflow: hidden;
}

.portrait-glow {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--secondary) 40%, transparent) 0%,
    transparent 70%
  );
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  pointer-events: none;
}

.portrait-ring {
  position: relative;
  z-index: 1;
  padding: 4px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    color-mix(in srgb, var(--secondary) 80%, transparent),
    transparent 40%,
    color-mix(in srgb, var(--secondary) 60%, transparent) 60%,
    transparent 80%,
    color-mix(in srgb, var(--secondary) 80%, transparent)
  );
}

.portrait-frame {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--primary) 80%, #000);
  box-shadow:
    0 0 30px color-mix(in srgb, var(--secondary) 35%, transparent),
    inset 0 0 20px color-mix(in srgb, var(--secondary) 10%, transparent);
}

.portrait-emoji {
  font-size: 3.5rem;
  filter: drop-shadow(0 0 10px var(--secondary));
}

.portrait-footer {
  text-align: center;
  position: relative;
  z-index: 1;
}
.portrait-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--secondary);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-family: 'Cinzel', serif;
}
.portrait-domain {
  font-size: 0.68rem;
  color: var(--accent);
  opacity: 0.65;
  font-style: italic;
  font-family: Georgia, serif;
  margin-top: 0.2rem;
}

.portrait-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.pline {
  position: absolute;
  background: color-mix(in srgb, var(--secondary) 15%, transparent);
}
.pline-1 {
  top: 15%;
  left: 0;
  right: 0;
  height: 1px;
}
.pline-2 {
  bottom: 15%;
  left: 0;
  right: 0;
  height: 1px;
}

/* ── Text ── */
.god-text {
  flex: 1;
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-family: 'Cinzel', serif;
}

.detail-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.5;
}
.detail-name {
  font-size: 1.8rem;
  color: var(--secondary);
  line-height: 1.1;
}
.detail-domain {
  font-size: 0.85rem;
  font-style: italic;
  color: var(--accent);
  opacity: 0.8;
  font-family: Georgia, serif;
}
.detail-intro {
  font-size: 0.9rem;
  line-height: 1.6;
  opacity: 0.85;
  margin-top: 0.6rem;
  font-family: Georgia, serif;
}
.detail-guide {
  font-size: 0.85rem;
  line-height: 1.55;
  opacity: 0.65;
  font-style: italic;
  margin-bottom: auto;
  font-family: Georgia, serif;
}

.confirm-btn {
  margin-top: 1.25rem;
  align-self: flex-start;
  background: var(--secondary);
  color: var(--primary);
  border: none;
  padding: 0.65rem 1.5rem;
  border-radius: 7px;
  font-size: 0.95rem;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Cinzel', serif;
  transition: opacity 0.2s, transform 0.15s;
}
.confirm-btn:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}
</style>
