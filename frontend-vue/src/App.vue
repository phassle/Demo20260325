<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Layout from './components/layout/Layout.vue';

const route = useRoute();
const title = computed(() => (route.meta.title as string) ?? 'Dashboard');
</script>

<template>
  <Layout :title="title">
    <RouterView />
  </Layout>
</template>
