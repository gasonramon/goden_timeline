<template>
  <img :src="imageUrl" class="puzzle-piece-img" alt="puzzle piece" draggable="false" />
</template>

<script setup lang="ts">
defineProps<{
  imageUrl: string
}>()
</script>

<style scoped>
.puzzle-piece-img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  user-select: none;
}
</style>