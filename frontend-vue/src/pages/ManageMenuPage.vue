<script setup lang="ts">
import { computed } from 'vue';
import { useMenuItems } from '../composables/useMenuItems';

const { items, loading, error } = useMenuItems();

const categories = computed(() => [...new Set(items.value.map((i) => i.category))]);
</script>

<template>
  <div class="page">
    <h1>Manage Menu</h1>
    <p v-if="loading">Loading menu...</p>
    <p v-else-if="error" class="error">Error: {{ error }}</p>
    <template v-else>
      <div v-for="cat in categories" :key="cat" style="margin-bottom: 32px">
        <h2 style="font-size: 15px; font-weight: 700; color: #4F46E5; margin-bottom: 12px">{{ cat }}</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Name</th>
              <th>Price (IDR)</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items.filter((i) => i.category === cat)" :key="item.id">
              <td style="font-size: 20px">{{ item.emoji }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.price.toLocaleString('id-ID') }}</td>
              <td :style="{ color: item.isAvailable ? '#16a34a' : '#dc2626', fontWeight: '600' }">
                {{ item.isAvailable ? 'Yes' : 'No' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>
