<script setup lang="ts">
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';

defineProps<{ title?: string }>();
</script>

<template>
  <div class="app-shell">
    <Sidebar />
    <div class="main-area">
      <Header :title="title ?? 'Dashboard'" />
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>
