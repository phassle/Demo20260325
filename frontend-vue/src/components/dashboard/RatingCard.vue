<script setup lang="ts">
const ratings = [
  { label: 'Hygiene', pct: 85, color: '#7c3aed' },
  { label: 'Food Taste', pct: 85, color: '#f97316' },
  { label: 'Packaging', pct: 92, color: '#0d9488' },
];
</script>

<template>
  <div class="card">
    <div class="card-title">Customer Rating</div>
    <div class="card-value" style="margin-bottom: 16px">4.8 &#x2605;</div>
    <div style="position: relative; height: 90px; margin-bottom: 12px">
      <div
        v-for="(r, i) in ratings"
        :key="r.label"
        :style="{
          position: 'absolute',
          left: i * 32 + 'px',
          top: '0',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: r.color,
          opacity: '0.85',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '13px',
          fontWeight: '700',
          border: '3px solid #fff',
          zIndex: i + 1,
        }"
      >
        {{ r.pct }}%
      </div>
    </div>
    <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px">
      <div v-for="r in ratings" :key="r.label" style="display: flex; align-items: center; gap: 8px">
        <span :style="{ width: '10px', height: '10px', borderRadius: '50%', background: r.color, display: 'inline-block', flexShrink: '0' }" />
        <span style="font-size: 12px; color: #6b7280; flex: 1">{{ r.label }}</span>
        <span style="font-size: 12px; font-weight: 600">{{ r.pct }}%</span>
      </div>
    </div>
  </div>
</template>
