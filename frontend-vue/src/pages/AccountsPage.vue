<script setup lang="ts">
import { useCustomers } from '../composables/useCustomers';
import CustomerTable from '../components/CustomerTable.vue';

const { customers, loading, error } = useCustomers();
</script>

<template>
  <div class="page">
    <h1>Accounts</h1>
    <p v-if="loading">Loading accounts...</p>
    <p v-else-if="error" class="error">Error: {{ error }}</p>
    <CustomerTable v-else :customers="customers" />
  </div>
</template>
