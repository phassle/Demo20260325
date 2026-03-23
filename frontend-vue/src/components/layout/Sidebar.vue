<script setup lang="ts">
import { RouterLink } from 'vue-router';

const MENU_NAV = [
  { to: '/', label: 'Dashboard', icon: '\u25A6' },
  { to: '/food-order', label: 'Food Order', icon: '\uD83D\uDED2' },
  { to: '/manage-menu', label: 'Manage Menu', icon: '\uD83C\uDF7D\uFE0F' },
  { to: '/customer-review', label: 'Customer Review', icon: '\u2B50' },
];

const OTHERS_NAV = [
  { to: '/settings', label: 'Settings', icon: '\u2699\uFE0F' },
  { to: '/payment', label: 'Payment', icon: '\uD83D\uDCB3' },
  { to: '/accounts', label: 'Accounts', icon: '\uD83D\uDC64' },
  { to: '/help', label: 'Help', icon: '\u2753' },
];
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      <span>&#x1F354;</span> GoodFood
    </div>
    <div class="sidebar-section">MENU</div>
    <ul class="sidebar-nav">
      <li v-for="item in MENU_NAV" :key="item.to">
        <RouterLink :to="item.to" active-class="active" :exact="item.to === '/'">
          <span>{{ item.icon }}</span> {{ item.label }}
        </RouterLink>
      </li>
    </ul>
    <div class="sidebar-section">OTHERS</div>
    <ul class="sidebar-nav">
      <li v-for="item in OTHERS_NAV" :key="item.to">
        <RouterLink :to="item.to" active-class="active">
          <span>{{ item.icon }}</span> {{ item.label }}
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>
