import request from '../services/api';
import type { Category, HomeBanner } from '../types/home';

// 获取首页数据
export const getHomeCategoryApi = () => {
  return request.get<Category[]>('/home/category/head');
};

// 获取首页数据
export const getHomeBananerApi = (distributionSite: 1 | 2) => {
  return request.get<HomeBanner[]>('/home/banner', {
    params: {
      distributionSite,
    },
  });
};
