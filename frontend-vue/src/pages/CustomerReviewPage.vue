<script setup lang="ts">
import { useCustomerReviews } from '../composables/useCustomerReviews';

const { reviews, loading, error } = useCustomerReviews();

function stars(n: number) {
  return '\u2605'.repeat(n) + '\u2606'.repeat(5 - n);
}
</script>

<template>
  <div class="page">
    <h1>Customer Review</h1>
    <p v-if="loading">Loading reviews...</p>
    <p v-else-if="error" class="error">Error: {{ error }}</p>
    <table v-else class="data-table">
      <thead>
        <tr>
          <th>Customer</th>
          <th>Food Item</th>
          <th>Rating</th>
          <th>Comment</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in reviews" :key="r.id">
          <td>{{ r.customerName }}</td>
          <td>{{ r.foodItem }}</td>
          <td style="color: #f59e0b">{{ stars(r.rating) }}</td>
          <td>{{ r.comment }}</td>
          <td>{{ new Date(r.date).toLocaleDateString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
