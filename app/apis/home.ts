import request from '../services/api';
import type {
  Category,
  NewGoods,
  HomeBanner,
  HotGoods,
  Brand,
  CategoryResult,
  SpecialItem,
} from '../types/home';

// 获取首页分类导航
export const getHomeCategoryApi = () => {
  return request.get<Category[]>('/home/category/head');
};

// 获取首页Banner
export const getHomeBananerApi = (distributionSite: 1 | 2) => {
  return request.get<HomeBanner[]>('/home/banner', {
    params: {
      distributionSite,
    },
  });
};

// 获取首页新鲜好物
export function getHomeNewGoodsApi(limit = 4) {
  return request.get<NewGoods[]>('/home/new', {
    params: {
      limit,
    },
  });
}

// 获取首页人气推荐
export function getHomeHotApi() {
  return request.get<HotGoods[]>('/home/hot');
}

//  获取热门品牌
export function getHomeBrandsApi(limit = 10) {
  return request.get<Brand[]>('/home/brand', { params: { limit } });
}

// 获取首页商品推荐
export function getHomeGoodsApi() {
  return request.get<CategoryResult[]>('/home/goods');
}

// 获取首页最新专题
export function getHomeSpecialApi(limit = 4) {
  return request.get<SpecialItem[]>('/home/special', { params: { limit } });
}
