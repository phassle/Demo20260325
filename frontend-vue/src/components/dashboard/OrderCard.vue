<script setup lang="ts">
const labels = ['01', '02', '03', '04', '05', '06'];
const last6Days = [20, 45, 30, 60, 40, 75];
const lastWeek = [15, 30, 20, 50, 35, 55];
const W = 200, H = 70;
const max = Math.max(...last6Days, ...lastWeek);

function pts(data: number[]) {
  return data
    .map((v, i) => `${(i / (data.length - 1)) * W},${H - (v / max) * H}`)
    .join(' ');
}
</script>

<template>
  <div class="card">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px">
      <div>
        <div class="card-title">Order</div>
        <div class="card-value">2.568</div>
        <div style="font-size: 12px; color: #9ca3af; margin-top: 2px">Sales from 1-6 Dec, 2020</div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px">
        <button style="font-size: 12px; color: #4F46E5; background: none; border: 1px solid #e0e7ff; border-radius: 6px; padding: 4px 10px; cursor: pointer">
          View Report
        </button>
        <div style="display: flex; align-items: center; gap: 4px">
          <span class="card-badge badge-red">&darr; 2.1%</span>
          <span style="font-size: 11px; color: #9ca3af">vs last week</span>
        </div>
      </div>
    </div>
    <svg :viewBox="`0 0 ${W} ${H + 16}`" width="100%" style="display: block; margin-top: 8px">
      <polyline :points="pts(last6Days)" fill="none" stroke="#4F46E5" stroke-width="2" stroke-linejoin="round" />
      <polyline :points="pts(lastWeek)" fill="none" stroke="#c7d2fe" stroke-width="2" stroke-linejoin="round" />
      <text v-for="(lbl, i) in labels" :key="lbl" :x="(i / (labels.length - 1)) * W" :y="H + 14" text-anchor="middle" font-size="9" fill="#9ca3af">{{ lbl }}</text>
    </svg>
    <div style="display: flex; gap: 16px; margin-top: 4px">
      <span style="font-size: 12px; color: #6b7280; display: flex; align-items: center; gap: 5px">
        <span style="width: 10px; height: 10px; border-radius: 2px; background: #4F46E5; display: inline-block" /> Last 6 days
      </span>
      <span style="font-size: 12px; color: #6b7280; display: flex; align-items: center; gap: 5px">
        <span style="width: 10px; height: 10px; border-radius: 2px; background: #c7d2fe; display: inline-block" /> Last Week
      </span>
    </div>
  </div>
</template>
