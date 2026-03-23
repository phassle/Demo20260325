<script setup lang="ts">
import RevenueCard from '../components/dashboard/RevenueCard.vue';
import OrderCard from '../components/dashboard/OrderCard.vue';
import OrderTimeCard from '../components/dashboard/OrderTimeCard.vue';
import RatingCard from '../components/dashboard/RatingCard.vue';
import MostOrderedFood from '../components/dashboard/MostOrderedFood.vue';
</script>

<template>
  <div class="dashboard-grid">
    <RevenueCard />
    <OrderCard />
    <OrderTimeCard />
    <RatingCard />
    <MostOrderedFood />
  </div>
</template>
