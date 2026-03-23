<script setup lang="ts">
import { ref, computed } from 'vue';

const R = 50;
const CX = 70;
const CY = 70;
const CIRCUMFERENCE = 2 * Math.PI * R;

const segments = [
  { label: 'Afternoon', pct: 40, color: '#312e81', timeRange: '1pm - 4pm', orders: '1.890' },
  { label: 'Evening', pct: 32, color: '#4F46E5', timeRange: '4pm - 8pm', orders: '1.512' },
  { label: 'Morning', pct: 28, color: '#a5b4fc', timeRange: '8am - 12pm', orders: '1.323' },
];

const hovered = ref<string | null>(null);
const hoveredSeg = computed(() => segments.find(s => s.label === hovered.value));

function getRotation(index: number) {
  let rotation = -90;
  for (let i = 0; i < index; i++) {
    rotation += (segments[i].pct / 100) * 360;
  }
  return rotation;
}
</script>

<template>
  <div class="card">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px">
      <div>
        <div class="card-title">Order Time</div>
        <div style="font-size: 12px; color: #9ca3af; margin-top: 2px">From 1-6 Dec, 2020</div>
      </div>
      <button style="font-size: 12px; color: #4F46E5; background: none; border: 1px solid #e0e7ff; border-radius: 6px; padding: 4px 10px; cursor: pointer">
        View Report
      </button>
    </div>
    <div style="position: relative; display: flex; justify-content: center; margin-top: 12px">
      <svg viewBox="0 0 140 140" width="120" height="120">
        <circle :cx="CX" :cy="CY" :r="R" fill="none" stroke="#f3f4f6" stroke-width="18" />
        <circle
          v-for="(s, i) in segments"
          :key="s.label"
          :cx="CX" :cy="CY" :r="R"
          fill="none"
          :stroke="s.color"
          :stroke-width="hovered === s.label ? 22 : 18"
          :stroke-dasharray="`${CIRCUMFERENCE * s.pct / 100} ${CIRCUMFERENCE}`"
          stroke-dashoffset="0"
          :transform="`rotate(${getRotation(i)} ${CX} ${CY})`"
          stroke-linecap="round"
          style="cursor: pointer; transition: stroke-width 0.15s"
          @mouseenter="hovered = s.label"
          @mouseleave="hovered = null"
        />
        <text v-if="hovered" :x="CX" :y="CY + 5" text-anchor="middle" font-size="13" font-weight="700" fill="#1a1a2e">
          {{ hoveredSeg?.pct }}%
        </text>
        <text v-else :x="CX" :y="CY + 5" text-anchor="middle" font-size="11" fill="#6b7280">Peak</text>
      </svg>
      <div v-if="hoveredSeg" style="position: absolute; top: 50%; left: 50%; transform: translate(10px, -50%); background: #1f2937; color: #fff; border-radius: 8px; padding: 8px 12px; font-size: 12px; white-space: nowrap; pointer-events: none; z-index: 10">
        <div style="font-weight: 600">{{ hoveredSeg.label }}</div>
        <div style="color: #d1d5db; margin-top: 2px">{{ hoveredSeg.timeRange }}</div>
        <div style="color: #d1d5db">{{ hoveredSeg.orders }} orders</div>
      </div>
    </div>
    <div style="display: flex; justify-content: space-around; margin-top: 16px">
      <div v-for="s in segments" :key="s.label" style="display: flex; align-items: center; gap: 5px">
        <span :style="{ width: '8px', height: '8px', borderRadius: '50%', background: s.color, display: 'inline-block', flexShrink: '0' }" />
        <span style="font-size: 11px; color: #6b7280">{{ s.label }}</span>
        <span style="font-size: 11px; font-weight: 600">{{ s.pct }}%</span>
      </div>
    </div>
  </div>
</template>
