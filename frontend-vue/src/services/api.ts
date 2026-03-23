import axios from 'axios';
import type { Customer } from '../types/customer';
import type { FoodOrder } from '../types/foodOrder';
import type { MenuItem } from '../types/menuItem';
import type { CustomerReview } from '../types/review';
import type { Payment } from '../types/payment';

const api = axios.create({
  baseURL: '/api/v2',
});

export const customerApi = {
  getAll: (signal?: AbortSignal) =>
    api.get<Customer[]>('/customers', { signal }).then((r) => r.data),

  getById: (id: number) =>
    api.get<Customer>(`/customers/${id}`).then((r) => r.data),

  // TODO: YT-1234 — Add export endpoint call
  // exportCsv: () =>
  //   api.get('/customers/export', { responseType: 'blob' }),
};

export const foodOrderApi = {
  getAll: (signal?: AbortSignal) =>
    api.get<FoodOrder[]>('/foodorders', { signal }).then((r) => r.data),
};

export const menuItemApi = {
  getAll: (signal?: AbortSignal) =>
    api.get<MenuItem[]>('/menuitems', { signal }).then((r) => r.data),
};

export const customerReviewApi = {
  getAll: (signal?: AbortSignal) =>
    api.get<CustomerReview[]>('/customerreviews', { signal }).then((r) => r.data),
};

export const paymentApi = {
  getAll: (signal?: AbortSignal) =>
    api.get<Payment[]>('/payments', { signal }).then((r) => r.data),
};
