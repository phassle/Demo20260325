import { useApiData } from './useApiData';
import { menuItemApi } from '../services/api';
import type { MenuItem } from '../types/menuItem';

export function useMenuItems() {
  const { data: items, loading, error } = useApiData<MenuItem>(menuItemApi.getAll);
  return { items, loading, error };
}
