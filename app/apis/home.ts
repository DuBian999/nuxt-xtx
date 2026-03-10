import request from '../services/api';
import type { Category, NewGoods, HomeBanner, HotGoods } from '../types/home';

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
