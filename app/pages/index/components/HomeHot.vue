<template>
  <SectionContainer
    title="人气推荐"
    subTitle="热门商品 不容错过"
    :showViewAll="true"
    containerClass="home-hot"
    @viewAllClick="handleViewAll"
  >
    <el-row justify="space-between" :gutter="20">
      <el-col
        :xs="12"
        :sm="8"
        :md="6"
        v-for="goods in hotGoodsList"
        :key="goods.id"
      >
        <div class="goods-item">
          <div class="goods-image">
            <img
              class="goods-img"
              :src="goods.picture"
              :alt="goods.title"
              loading="lazy"
            />
          </div>
          <div class="goods-info">
            <h4 class="goods-name">{{ goods.title }}</h4>
            <p class="goods-price">{{ goods.alt }}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </SectionContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getHomeHotApi } from '~/apis/home';
import SectionContainer from './SectionContainer.vue';
import type { HotGoods } from '~/types/home';

const hotGoodsList = ref<HotGoods[]>([]);

// 获取人气推荐数据
const fetchHotGoodsData = async () => {
  try {
    const response = await getHomeHotApi();
    hotGoodsList.value = response || [];
  } catch (error) {
    console.error('获取人气推荐数据失败:', error);
  }
};

// 处理查看全部点击事件
const handleViewAll = () => {
  // 这里可以添加跳转到商品列表页面的逻辑
  console.log('查看全部商品');
};

// 组件挂载时获取数据
onMounted(() => {
  fetchHotGoodsData();
});
</script>

<style lang="scss" scoped>
.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.goods-item {
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .goods-image {
    width: 100%;
    padding-top: 100%; /* 1:1 宽高比 */
    position: relative;
    overflow: hidden;

    .goods-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover .goods-img {
      transform: scale(1.05);
    }
  }

  .goods-info {
    padding: 15px;

    .goods-name {
      font-size: 14px;
      color: #303133;
      margin: 0 0 10px 0;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-clamp: 1;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .goods-price {
      font-size: 16px;
      font-weight: 600;
      color: var(--theme-color);
      margin: 0;
    }
  }
}
</style>
