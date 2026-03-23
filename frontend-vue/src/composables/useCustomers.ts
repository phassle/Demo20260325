import { useApiData } from './useApiData';
import { customerApi } from '../services/api';
import type { Customer } from '../types/customer';

export function useCustomers() {
  const { data: customers, loading, error } = useApiData<Customer>(customerApi.getAll);
  return { customers, loading, error };
}
