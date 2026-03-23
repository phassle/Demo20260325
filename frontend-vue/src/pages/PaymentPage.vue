<script setup lang="ts">
import { computed } from 'vue';
import { usePayments } from '../composables/usePayments';

const STATUS_COLOR: Record<string, string> = {
  Completed: '#16a34a',
  Pending: '#d97706',
  Failed: '#dc2626',
};

const { payments, loading, error } = usePayments();

const total = computed(() =>
  payments.value.filter((p) => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0)
);
</script>

<template>
  <div class="page">
    <h1>Payment</h1>
    <p v-if="loading">Loading payments...</p>
    <p v-else-if="error" class="error">Error: {{ error }}</p>
    <template v-else>
      <p style="color: #6b7280; margin-bottom: 16px">
        Total collected:
        <strong style="color: #1f2937">IDR {{ total.toLocaleString('id-ID') }}</strong>
      </p>
      <table class="data-table">
        <thead>
          <tr>
            <th>Order #</th>
            <th>Customer</th>
            <th>Amount (IDR)</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in payments" :key="p.id">
            <td>{{ p.orderId }}</td>
            <td>{{ p.customerName }}</td>
            <td>{{ p.amount.toLocaleString('id-ID') }}</td>
            <td>{{ p.method }}</td>
            <td>
              <span :style="{ color: STATUS_COLOR[p.status] ?? '#6b7280', fontWeight: '600' }">
                {{ p.status }}
              </span>
            </td>
            <td>{{ new Date(p.date).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>
