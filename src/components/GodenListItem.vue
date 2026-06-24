<template>
  <li
    class="god-row"
    :class="{ selected }"
    :style="{ '--secondary': god.theme.secondary }"
    @click="$emit('select', god)"
  >
    <span class="row-name">{{ god.name }}</span>
    <span class="row-domain">{{ god.domain }}</span>
  </li>
</template>

<script setup lang="ts">
import type { God } from '../assets/gods'

defineProps<{ god: God; selected: boolean }>()
defineEmits<{ select: [god: God] }>()
</script>

<style scoped>
.god-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.55rem 0.9rem;
  border-radius: 7px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  gap: 0.5rem;
  list-style: none;
}

.god-row:hover {
  background: color-mix(in srgb, var(--secondary) 12%, transparent);
  border-color: color-mix(in srgb, var(--secondary) 35%, transparent);
}

.god-row.selected {
  background: color-mix(in srgb, var(--secondary) 18%, transparent);
  border-color: var(--secondary);
}

.row-name {
  font-size: 1rem;
  font-weight: bold;
  color: #e8e0d0;
  white-space: nowrap;
}

.god-row.selected .row-name {
  color: var(--secondary);
}

.row-domain {
  font-size: 0.72rem;
  opacity: 0.5;
  font-style: italic;
  text-align: right;
  line-height: 1.3;
}
</style>