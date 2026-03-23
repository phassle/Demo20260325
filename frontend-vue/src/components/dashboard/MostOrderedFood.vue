<script setup lang="ts">
const foods = [
  { name: 'Cheeseburger', orders: 1240, pct: 92, emoji: '\uD83C\uDF54' },
  { name: 'Pepperoni Pizza', orders: 980, pct: 78, emoji: '\uD83C\uDF55' },
  { name: 'Caesar Salad', orders: 760, pct: 61, emoji: '\uD83E\uDD57' },
  { name: 'Chicken Wings', orders: 640, pct: 52, emoji: '\uD83C\uDF57' },
  { name: 'Veggie Wrap', orders: 420, pct: 34, emoji: '\uD83C\uDF2F' },
];
</script>

<template>
  <div class="card">
    <div class="card-title" style="margin-bottom: 16px">Most Ordered Food</div>
    <div style="display: flex; flex-direction: column; gap: 14px">
      <div v-for="f in foods" :key="f.name" style="display: flex; align-items: center; gap: 12px">
        <span style="font-size: 22px">{{ f.emoji }}</span>
        <div style="flex: 1">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
            <span style="font-size: 13px; font-weight: 500">{{ f.name }}</span>
            <span style="font-size: 12px; color: #9ca3af">{{ f.orders.toLocaleString() }} orders</span>
          </div>
          <div style="height: 6px; border-radius: 3px; background: #f3f4f6; overflow: hidden">
            <div :style="{ height: '100%', width: f.pct + '%', background: '#4F46E5', borderRadius: '3px' }" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
