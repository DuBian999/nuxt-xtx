import request from '../services/api';
import type { ProductDetailResult } from '../types/product';

// 获取商品详情
export function getProductDetailApi(id: string) {
  return request.get<ProductDetailResult>(`/goods`, {
    params: {
      id,
    },
  });
}
