<script setup lang="ts">
const labels = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const last6Days = [40, 70, 50, 90, 60, 80, 55, 75, 65, 85, 50, 95];
const lastWeek = [30, 50, 40, 60, 45, 55, 40, 60, 50, 70, 40, 75];

const W = 320, H = 100, BAR_W = 10, GAP = 4;
const max = Math.max(...last6Days, ...lastWeek);
const step = W / labels.length;
</script>

<template>
  <div class="card" style="grid-column: span 2">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px">
      <div>
        <div class="card-title">Revenue</div>
        <div class="card-value">IDR 7.852.000</div>
        <div style="font-size: 12px; color: #9ca3af; margin-top: 2px">Sales from 1-12 Dec, 2020</div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px">
        <button style="font-size: 12px; color: #4F46E5; background: none; border: 1px solid #e0e7ff; border-radius: 6px; padding: 4px 10px; cursor: pointer">
          View Report
        </button>
        <div style="display: flex; align-items: center; gap: 4px">
          <span class="card-badge badge-green">&uarr; 2.1%</span>
          <span style="font-size: 11px; color: #9ca3af">vs last week</span>
        </div>
      </div>
    </div>
    <svg :viewBox="`0 0 ${W} ${H + 20}`" width="100%" style="display: block; margin-top: 12px">
      <g v-for="(lbl, i) in labels" :key="lbl">
        <rect :x="i * step + step / 2 - BAR_W - GAP / 2" :y="H - (last6Days[i] / max) * H" :width="BAR_W" :height="(last6Days[i] / max) * H" fill="#4F46E5" rx="3" />
        <rect :x="i * step + step / 2 + GAP / 2" :y="H - (lastWeek[i] / max) * H" :width="BAR_W" :height="(lastWeek[i] / max) * H" fill="#c7d2fe" rx="3" />
        <text :x="i * step + step / 2" :y="H + 14" text-anchor="middle" font-size="9" fill="#9ca3af">{{ lbl }}</text>
      </g>
    </svg>
    <div style="display: flex; gap: 16px; margin-top: 8px">
      <span style="font-size: 12px; color: #6b7280; display: flex; align-items: center; gap: 5px">
        <span style="width: 10px; height: 10px; border-radius: 2px; background: #4F46E5; display: inline-block" /> Last 6 days
      </span>
      <span style="font-size: 12px; color: #6b7280; display: flex; align-items: center; gap: 5px">
        <span style="width: 10px; height: 10px; border-radius: 2px; background: #c7d2fe; display: inline-block" /> Last Week
      </span>
    </div>
  </div>
</template>
