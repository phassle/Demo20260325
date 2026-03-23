import { useApiData } from './useApiData';
import { paymentApi } from '../services/api';
import type { Payment } from '../types/payment';

export function usePayments() {
  const { data: payments, loading, error } = useApiData<Payment>(paymentApi.getAll);
  return { payments, loading, error };
}
