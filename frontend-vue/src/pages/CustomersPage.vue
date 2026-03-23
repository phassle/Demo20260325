<script setup lang="ts">
import { useCustomers } from '../composables/useCustomers';
import CustomerTable from '../components/CustomerTable.vue';

const { customers, loading, error } = useCustomers();

async function downloadCsv() {
  const res = await fetch('/api/v2/customers/export');
  if (!res.ok) {
    alert(`Export failed: ${res.status}`);
    return;
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'customers.csv';
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <div class="page">
    <h1>Customers</h1>
    <p v-if="loading">Loading customers...</p>
    <p v-else-if="error" class="error">Error: {{ error }}</p>
    <template v-else>
      <div class="actions">
        <button @click="downloadCsv">Export CSV</button>
      </div>
      <CustomerTable :customers="customers" />
    </template>
  </div>
</template>
