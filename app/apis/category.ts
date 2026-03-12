import request from '../services/api';
import type { CategoryResult } from '../types/category';

// 获取首页新鲜好物
export function getCategoryApi(id: string) {
  return request.get<CategoryResult>('/category', {
    params: {
      id,
    },
  });
}
