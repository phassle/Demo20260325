<script setup lang="ts">
import type { Customer } from '../types/customer';

defineProps<{ customers: Customer[] }>();
</script>

<template>
  <table class="customer-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Org. Number</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="c in customers" :key="c.id">
        <td>{{ c.id }}</td>
        <td>{{ c.name }}</td>
        <td>{{ c.email }}</td>
        <td>{{ c.organizationNumber }}</td>
      </tr>
    </tbody>
  </table>
</template>
