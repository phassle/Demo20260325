import { useApiData } from './useApiData';
import { customerReviewApi } from '../services/api';
import type { CustomerReview } from '../types/review';

export function useCustomerReviews() {
  const { data: reviews, loading, error } = useApiData<CustomerReview>(customerReviewApi.getAll);
  return { reviews, loading, error };
}
