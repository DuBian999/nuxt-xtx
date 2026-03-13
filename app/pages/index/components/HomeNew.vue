<template>
  <SectionContainer
    title="新鲜好物"
    subTitle="新鲜出炉 品质靠谱"
    :showViewAll="true"
    containerClass="home-new"
    @viewAllClick="handleViewAll"
  >
    <el-row justify="space-between" :gutter="20">
      <el-col
        :xs="12"
        :sm="8"
        :md="6"
        v-for="goods in newGoodsList"
        :key="goods.id"
      >
        <NuxtLink :to="`/product/${goods.id}`">
          <div class="goods-item">
            <div class="goods-image">
              <img
                class="goods-img"
                :src="goods.picture"
                :alt="goods.name"
                loading="lazy"
              />
            </div>
            <div class="goods-info">
              <h4 class="goods-name">{{ goods.name }}</h4>
              <p class="goods-price">¥{{ goods.price }}</p>
            </div>
          </div>
        </NuxtLink>
      </el-col>
    </el-row>
  </SectionContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getHomeNewGoodsApi } from '~/apis/home';
import SectionContainer from './SectionContainer.vue';
import type { NewGoods } from '~/types/home';

const newGoodsList = ref<NewGoods[]>([]);

// 获取最新商品数据
const fetchNewGoodsData = async () => {
  try {
    const response = await getHomeNewGoodsApi();
    newGoodsList.value = response || [];
  } catch (error) {
    console.error('获取最新商品数据失败:', error);
  }
};

// 处理查看全部点击事件
const handleViewAll = () => {
  // 这里可以添加跳转到商品列表页面的逻辑
  console.log('查看全部商品');
};

// 组件挂载时获取数据
onMounted(() => {
  fetchNewGoodsData();
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
  @extend .transition-all;
  cursor: pointer;
  margin-bottom: 20px;

  @extend .hover-lift;
  @extend .hover-shadow;

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
      @extend .transition-transform;
      @extend .hover-scale;
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

// 响应式设计
@media (max-width: 768px) {
  .goods-item {
    .goods-info {
      padding: 10px;

      .goods-name {
        font-size: 12px;
      }

      .goods-price {
        font-size: 14px;
      }
    }
  }
}
</style>
