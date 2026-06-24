<template>
  <div>
    <p>{{ store.historyFact }}</p>
  </div>
</template>

<script setup lang="ts">
import { useHistoryFactStore } from '../assets/Store/historyfact'
const store = useHistoryFactStore()
</script>
