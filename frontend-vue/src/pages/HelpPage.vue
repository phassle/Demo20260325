<script setup lang="ts">
const FAQ = [
  { q: 'How do I add a new menu item?', a: 'Go to Manage Menu and click "Add Item".' },
  { q: 'How do I export orders?', a: 'Open Food Order and use the Export button.' },
  { q: 'How do I respond to a customer review?', a: 'Open Customer Review, find the review and click "Reply".' },
  { q: 'Where can I see payment history?', a: 'Go to Payment to see all transactions.' },
  { q: 'How do I change my restaurant name?', a: 'Go to Settings and update the Restaurant Name field.' },
];
</script>

<template>
  <div class="page">
    <h1>Help</h1>
    <p style="color: #6b7280; margin-bottom: 24px">Frequently asked questions</p>
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 640px">
      <div v-for="{ q, a } in FAQ" :key="q" style="background: #f9fafb; border-radius: 10px; padding: 14px 18px">
        <div style="font-weight: 600; margin-bottom: 4px">{{ q }}</div>
        <div style="color: #6b7280; font-size: 14px">{{ a }}</div>
      </div>
    </div>
  </div>
</template>
