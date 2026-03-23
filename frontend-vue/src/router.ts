import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from './pages/DashboardPage.vue';
import CustomersPage from './pages/CustomersPage.vue';
import FoodOrderPage from './pages/FoodOrderPage.vue';
import ManageMenuPage from './pages/ManageMenuPage.vue';
import CustomerReviewPage from './pages/CustomerReviewPage.vue';
import PaymentPage from './pages/PaymentPage.vue';
import AccountsPage from './pages/AccountsPage.vue';
import SettingsPage from './pages/SettingsPage.vue';
import HelpPage from './pages/HelpPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: DashboardPage, meta: { title: 'Dashboard' } },
    { path: '/customers', component: CustomersPage, meta: { title: 'Customers' } },
    { path: '/food-order', component: FoodOrderPage, meta: { title: 'Food Order' } },
    { path: '/manage-menu', component: ManageMenuPage, meta: { title: 'Manage Menu' } },
    { path: '/customer-review', component: CustomerReviewPage, meta: { title: 'Customer Review' } },
    { path: '/settings', component: SettingsPage, meta: { title: 'Settings' } },
    { path: '/payment', component: PaymentPage, meta: { title: 'Payment' } },
    { path: '/accounts', component: AccountsPage, meta: { title: 'Accounts' } },
    { path: '/help', component: HelpPage, meta: { title: 'Help' } },
  ],
});

export default router;
