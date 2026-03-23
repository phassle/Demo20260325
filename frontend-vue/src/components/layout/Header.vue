<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <header class="header">
    <div class="header-title">{{ title }}</div>
    <div class="header-search">
      <input type="text" placeholder="Search..." />
    </div>
    <div class="header-actions">
      <button class="header-bell" aria-label="Notifications">&#x1F514;</button>
      <div class="header-avatar">&#x1F354;</div>
      <span class="header-username">Delicious Burger</span>
    </div>
  </header>
</template>
