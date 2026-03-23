import { useApiData } from './useApiData';
import { foodOrderApi } from '../services/api';
import type { FoodOrder } from '../types/foodOrder';

export function useFoodOrders() {
  const { data: orders, loading, error } = useApiData<FoodOrder>(foodOrderApi.getAll);
  return { orders, loading, error };
}
