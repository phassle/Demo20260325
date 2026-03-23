<script setup lang="ts">
import { useFoodOrders } from '../composables/useFoodOrders';

const STATUS_COLOR: Record<string, string> = {
  Delivered: '#16a34a',
  Processing: '#d97706',
  Pending: '#6b7280',
  Cancelled: '#dc2626',
};

const { orders, loading, error } = useFoodOrders();
</script>

<template>
  <div class="page">
    <h1>Food Order</h1>
    <p v-if="loading">Loading orders...</p>
    <p v-else-if="error" class="error">Error: {{ error }}</p>
    <table v-else class="data-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Customer</th>
          <th>Items</th>
          <th>Total (IDR)</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="o in orders" :key="o.id">
          <td>{{ o.id }}</td>
          <td>{{ o.customerName }}</td>
          <td>{{ o.items.join(', ') }}</td>
          <td>{{ o.total.toLocaleString('id-ID') }}</td>
          <td>
            <span :style="{ color: STATUS_COLOR[o.status] ?? '#6b7280', fontWeight: '600' }">
              {{ o.status }}
            </span>
          </td>
          <td>{{ new Date(o.createdAt).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
