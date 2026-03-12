import request from '../services/api';
import type { CategoryResult } from '../types/category';
import type { ProductDetailResult } from '../types/subcategory';

// 获取首页新鲜好物
export function getCategoryApi(id: string) {
  return request.get<CategoryResult>('/category', {
    params: {
      id,
    },
  });
}

// 获取首页新鲜好物
export function getSubCategoryApi(id: string) {
  return request.get<ProductDetailResult>('/category/sub/filter', {
    params: {
      id,
    },
  });
}
